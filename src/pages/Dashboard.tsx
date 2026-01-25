import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Flame, Star, Trophy, Code2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/hooks/useProgress';
import { LANGUAGES } from '@/types';
import { cn } from '@/lib/utils';
import { exercises } from '@/data/exercises';

export default function Dashboard() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { progress, getCompletedByLanguage, getRecentAttempts } = useProgress();

  const recentActivity = getRecentAttempts(5);

  const stats = [
    {
      icon: Code2,
      label: t('dashboard.completedExercises'),
      value: progress.completedExercises.length,
      gradient: 'from-primary to-accent',
    },
    {
      icon: Flame,
      label: t('dashboard.currentStreak'),
      value: `${progress.streak} ${t('common.days')}`,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Star,
      label: t('dashboard.totalPoints'),
      value: progress.totalPoints,
      gradient: 'from-yellow-500 to-amber-500',
    },
    {
      icon: Trophy,
      label: t('progress.badges'),
      value: progress.badges.length,
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-muted p-8 lg:p-12 border border-border"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {language === 'fr' ? 'Bienvenue' : 'Welcome'}
            </span>
          </motion.div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('dashboard.welcome')}</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            {t('dashboard.subtitle')}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              onClick={() => navigate('/exercises')}
            >
              {progress.completedExercises.length > 0 
                ? t('dashboard.continueProgress') 
                : t('dashboard.startLearning')
              }
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              onClick={() => navigate('/challenges')}
            >
              <Trophy className="w-5 h-5" />
              {t('dashboard.dailyChallenge')}
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Stats Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
            className="bg-card rounded-xl border border-border p-5 hover:border-primary/50 transition-colors"
          >
            <div className={cn(
              "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center mb-3",
              stat.gradient
            )}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Language Cards */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {t('dashboard.selectLanguage')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LANGUAGES.map((lang, idx) => {
            const completed = getCompletedByLanguage(lang.id);
            const total = exercises.filter(e => e.language === lang.id).length;
            
            return (
              <motion.div
                key={lang.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(`/language/${lang.id}`)}
                className="bg-card rounded-xl border border-border p-6 cursor-pointer hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={cn("w-14 h-14 rounded-xl flex items-center justify-center text-2xl", lang.gradient)}>
                    {lang.icon}
                  </span>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {completed}/{total}
                    </p>
                    <div className="w-16 h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", lang.gradient)}
                        style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {lang.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {lang.description[language]}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h2 className="text-xl font-bold text-foreground mb-4">
            {t('dashboard.recentActivity')}
          </h2>
          
          <div className="space-y-3">
            {recentActivity.map((attempt, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm",
                    attempt.passed ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  )}>
                    {attempt.passed ? '✓' : '✗'}
                  </div>
                  <span className="font-medium text-foreground">{attempt.exerciseId}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(attempt.timestamp).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                </span>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
