import { motion } from 'framer-motion';
import { Book, Play, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LANGUAGES } from '@/types';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function Tutorials() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const tutorials = [
    {
      language: 'python',
      title: { fr: 'Introduction à Python', en: 'Introduction to Python' },
      lessons: [
        { fr: 'Variables et types de données', en: 'Variables and Data Types' },
        { fr: 'Structures de contrôle', en: 'Control Structures' },
        { fr: 'Fonctions', en: 'Functions' },
        { fr: 'Classes et objets (POO)', en: 'Classes and Objects (OOP)' },
      ],
    },
    {
      language: 'c',
      title: { fr: 'Programmation en C', en: 'C Programming' },
      lessons: [
        { fr: 'Syntaxe de base', en: 'Basic Syntax' },
        { fr: 'Pointeurs', en: 'Pointers' },
        { fr: 'Gestion mémoire', en: 'Memory Management' },
        { fr: 'Structures', en: 'Structures' },
      ],
    },
    {
      language: 'rust',
      title: { fr: 'Apprendre Rust', en: 'Learn Rust' },
      lessons: [
        { fr: 'Ownership et Borrowing', en: 'Ownership and Borrowing' },
        { fr: 'Types et traits', en: 'Types and Traits' },
        { fr: 'Gestion des erreurs', en: 'Error Handling' },
        { fr: 'Concurrence', en: 'Concurrency' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Book className="w-8 h-8 text-primary" />
          {t('tutorials.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('tutorials.subtitle')}
        </p>
      </motion.div>

      <div className="grid gap-6">
        {tutorials.map((tutorial, idx) => {
          const langInfo = LANGUAGES.find(l => l.id === tutorial.language);
          
          return (
            <motion.div
              key={tutorial.language}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <span className={cn("w-14 h-14 rounded-xl flex items-center justify-center text-2xl", langInfo?.gradient)}>
                    {langInfo?.icon}
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{tutorial.title[language]}</h2>
                    <p className="text-sm text-muted-foreground">
                      {tutorial.lessons.length} {t('tutorials.lessons')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-border">
                {tutorial.lessons.map((lesson, lessonIdx) => (
                  <button
                    key={lessonIdx}
                    onClick={() => navigate(`/language/${tutorial.language}`)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
                        {lessonIdx + 1}
                      </div>
                      <span className="text-foreground">{lesson[language]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Play className="w-4 h-4" />
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
