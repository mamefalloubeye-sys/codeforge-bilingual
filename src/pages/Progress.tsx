import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar, Trophy, Code2, Flame } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/hooks/useProgress';
import { LANGUAGES } from '@/types';
import { exercises } from '@/data/exercises';
import { cn } from '@/lib/utils';

export default function Progress() {
  const { t, language } = useLanguage();
  const { progress, getCompletedByLanguage, getRecentAttempts } = useProgress();

  const totalExercises = exercises.length;
  const completedTotal = progress.completedExercises.length;
  const overallPercentage = Math.round((completedTotal / totalExercises) * 100);

  const languageStats = LANGUAGES.map(lang => {
    const total = exercises.filter(e => e.language === lang.id).length;
    const completed = getCompletedByLanguage(lang.id);
    return {
      ...lang,
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  });

  const recentActivity = getRecentAttempts(10);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-primary" />
          {t('nav.progress')}
        </h1>
        <p className="text-muted-foreground">
          {language === 'fr' 
            ? 'Suivez votre progression et vos accomplissements'
            : 'Track your progress and achievements'}
        </p>
      </motion.div>

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-card rounded-xl border border-border p-5">
          <Code2 className="w-8 h-8 text-primary mb-3" />
          <p className="text-3xl font-bold text-foreground">{completedTotal}</p>
          <p className="text-sm text-muted-foreground">{t('dashboard.completedExercises')}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <Flame className="w-8 h-8 text-orange-400 mb-3" />
          <p className="text-3xl font-bold text-foreground">{progress.streak}</p>
          <p className="text-sm text-muted-foreground">{t('dashboard.currentStreak')}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <Trophy className="w-8 h-8 text-yellow-400 mb-3" />
          <p className="text-3xl font-bold text-foreground">{progress.totalPoints}</p>
          <p className="text-sm text-muted-foreground">{t('dashboard.totalPoints')}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
          <p className="text-3xl font-bold text-foreground">{overallPercentage}%</p>
          <p className="text-sm text-muted-foreground">{t('progress.overview')}</p>
        </div>
      </motion.div>

      {/* Overall Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">
          {language === 'fr' ? 'Progression globale' : 'Overall Progress'}
        </h2>
        <div className="h-4 bg-muted rounded-full overflow-hidden mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallPercentage}%` }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          />
        </div>
        <p className="text-sm text-muted-foreground text-right">
          {completedTotal}/{totalExercises} {language === 'fr' ? 'exercices complétés' : 'exercises completed'}
        </p>
      </motion.div>

      {/* By Language */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-6">
          {t('progress.byLanguage')}
        </h2>
        <div className="space-y-5">
          {languageStats.map((lang, idx) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-sm", lang.gradient)}>
                    {lang.icon}
                  </span>
                  <span className="font-medium text-foreground">{lang.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {lang.completed}/{lang.total}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percentage}%` }}
                  transition={{ delay: 0.5 + idx * 0.05, duration: 0.5 }}
                  className={cn("h-full rounded-full", lang.gradient)}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Activity History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          {t('progress.history')}
        </h2>
        
        {recentActivity.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            {language === 'fr' 
              ? 'Aucune activité récente. Commencez un exercice!'
              : 'No recent activity. Start an exercise!'}
          </p>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((attempt, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold",
                    attempt.passed ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  )}>
                    {attempt.passed ? '✓' : '✗'}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{attempt.exerciseId}</p>
                    <p className="text-xs text-muted-foreground">
                      {attempt.passed 
                        ? (language === 'fr' ? 'Réussi' : 'Passed')
                        : (language === 'fr' ? 'Échoué' : 'Failed')}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(attempt.timestamp).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
