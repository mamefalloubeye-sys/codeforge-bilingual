import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Book, Code2, Trophy, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/hooks/useProgress';
import { LANGUAGES, ProgrammingLanguage, Difficulty } from '@/types';
import { getExercisesByLanguage } from '@/data/exercises';
import { cn } from '@/lib/utils';

export default function LanguageSection() {
  const { langId } = useParams<{ langId: string }>();
  const navigate = useNavigate();
  const { t, language: appLang } = useLanguage();
  const { isExerciseCompleted } = useProgress();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [view, setView] = useState<'list' | 'exercise'>('list');

  const langInfo = LANGUAGES.find(l => l.id === langId);
  const allExercises = useMemo(() => 
    getExercisesByLanguage(langId as ProgrammingLanguage),
    [langId]
  );

  const filteredExercises = useMemo(() => 
    selectedDifficulty === 'all' 
      ? allExercises 
      : allExercises.filter(e => e.difficulty === selectedDifficulty),
    [allExercises, selectedDifficulty]
  );

  const currentExercise = filteredExercises[currentExerciseIndex];

  if (!langInfo) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-muted-foreground mb-4">
          {appLang === 'fr' ? 'Langage non trouvé' : 'Language not found'}
        </p>
        <Button onClick={() => navigate('/')}>
          {t('common.back')}
        </Button>
      </div>
    );
  }

  const difficulties: { value: Difficulty | 'all'; label: string; color: string }[] = [
    { value: 'all', label: appLang === 'fr' ? 'Tous' : 'All', color: 'bg-muted text-foreground' },
    { value: 'easy', label: t('exercise.easy'), color: 'bg-green-500/20 text-green-400' },
    { value: 'medium', label: t('exercise.medium'), color: 'bg-yellow-500/20 text-yellow-400' },
    { value: 'hard', label: t('exercise.hard'), color: 'bg-red-500/20 text-red-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => view === 'exercise' ? setView('list') : navigate('/')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <span className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-xl", langInfo.gradient)}>
          {langInfo.icon}
        </span>
        
        <div>
          <h1 className="text-2xl font-bold text-foreground">{langInfo.name}</h1>
          <p className="text-muted-foreground">{langInfo.description[appLang]}</p>
        </div>
      </motion.div>

      {view === 'list' ? (
        <>
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Filter className="w-4 h-4 text-muted-foreground" />
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => setSelectedDifficulty(diff.value)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  selectedDifficulty === diff.value
                    ? diff.color
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                )}
              >
                {diff.label}
              </button>
            ))}
          </motion.div>

          {/* Exercise List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4"
          >
            {filteredExercises.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {appLang === 'fr' 
                  ? 'Aucun exercice disponible pour ce filtre.'
                  : 'No exercises available for this filter.'}
              </div>
            ) : (
              filteredExercises.map((exercise, idx) => {
                const completed = isExerciseCompleted(exercise.id);
                
                return (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => {
                      setCurrentExerciseIndex(idx);
                      setView('exercise');
                    }}
                    className={cn(
                      "bg-card rounded-xl border p-5 cursor-pointer transition-all hover:border-primary/50 group",
                      completed ? "border-green-500/30" : "border-border"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold",
                          completed ? "bg-green-500/20 text-green-400" : "bg-muted text-muted-foreground"
                        )}>
                          {completed ? '✓' : idx + 1}
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {exercise.title[appLang]}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {exercise.description[appLang]}
                          </p>
                        </div>
                      </div>
                      
                      <div className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold",
                        exercise.difficulty === 'easy' && "bg-green-500/20 text-green-400",
                        exercise.difficulty === 'medium' && "bg-yellow-500/20 text-yellow-400",
                        exercise.difficulty === 'hard' && "bg-red-500/20 text-red-400"
                      )}>
                        {t(`exercise.${exercise.difficulty}`)}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <button
              onClick={() => navigate(`/tutorials/${langId}`)}
              className="bg-card rounded-xl border border-border p-5 text-left hover:border-primary/50 transition-all"
            >
              <Book className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground">{t('nav.tutorials')}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {appLang === 'fr' 
                  ? 'Apprenez les concepts de base'
                  : 'Learn the basic concepts'}
              </p>
            </button>
            
            <button
              onClick={() => {
                setCurrentExerciseIndex(0);
                setView('exercise');
              }}
              disabled={filteredExercises.length === 0}
              className="bg-card rounded-xl border border-border p-5 text-left hover:border-primary/50 transition-all disabled:opacity-50"
            >
              <Code2 className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold text-foreground">{t('nav.exercises')}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {appLang === 'fr'
                  ? 'Pratiquez avec des exercices guidés'
                  : 'Practice with guided exercises'}
              </p>
            </button>
            
            <button
              onClick={() => navigate(`/challenges/${langId}`)}
              className="bg-card rounded-xl border border-border p-5 text-left hover:border-primary/50 transition-all"
            >
              <Trophy className="w-8 h-8 text-yellow-400 mb-3" />
              <h3 className="font-semibold text-foreground">{t('nav.challenges')}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {appLang === 'fr'
                  ? 'Relevez des défis avancés'
                  : 'Take on advanced challenges'}
              </p>
            </button>
          </motion.div>
        </>
      ) : (
        currentExercise && (
          <CodeEditor
            exercise={currentExercise}
            onNext={() => {
              if (currentExerciseIndex < filteredExercises.length - 1) {
                setCurrentExerciseIndex(currentExerciseIndex + 1);
              }
            }}
            onPrevious={() => {
              if (currentExerciseIndex > 0) {
                setCurrentExerciseIndex(currentExerciseIndex - 1);
              }
            }}
            hasNext={currentExerciseIndex < filteredExercises.length - 1}
            hasPrevious={currentExerciseIndex > 0}
          />
        )
      )}
    </div>
  );
}
