import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/hooks/useProgress';
import { LANGUAGES } from '@/types';
import { exercises } from '@/data/exercises';
import { cn } from '@/lib/utils';

export default function Exercises() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { getCompletedByLanguage } = useProgress();

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">{t('nav.exercises')}</h1>
        <p className="text-muted-foreground">
          {t('exercises.chooseLanguage')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LANGUAGES.map((lang, idx) => {
          const completed = getCompletedByLanguage(lang.id);
          const total = exercises.filter(e => e.language === lang.id).length;
          const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
          
          return (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/language/${lang.id}`)}
              className="bg-card rounded-2xl border border-border p-6 cursor-pointer hover:border-primary/50 transition-all group"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className={cn("w-16 h-16 rounded-xl flex items-center justify-center text-3xl", lang.gradient)}>
                  {lang.icon}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {lang.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {total} {t('exercises.count')}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-4">
                {lang.description[language]}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t('exercises.progression')}
                  </span>
                  <span className="font-semibold text-foreground">{percentage}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
                    className={cn("h-full rounded-full", lang.gradient)}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  {completed}/{total} {t('exercises.completed')}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-sm font-medium text-primary group-hover:underline">
                  {t('exercises.start')}
                </span>
                <Code2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
