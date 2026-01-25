import { motion } from 'framer-motion';
import { Trophy, Zap, Calendar, Star, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Challenges() {
  const { language } = useLanguage();

  const dailyChallenge = {
    title: language === 'fr' ? 'Défi du jour: Fibonacci' : 'Daily Challenge: Fibonacci',
    description: language === 'fr'
      ? 'Implémentez une fonction qui calcule le n-ième nombre de Fibonacci.'
      : 'Implement a function that calculates the n-th Fibonacci number.',
    language: 'Python',
    difficulty: 'medium',
    points: 50,
    timeLeft: '12:34:56',
  };

  const challenges = [
    {
      id: 1,
      title: language === 'fr' ? 'Tri rapide' : 'Quick Sort',
      description: language === 'fr' 
        ? 'Implémentez l\'algorithme de tri rapide.'
        : 'Implement the quick sort algorithm.',
      language: 'Python',
      difficulty: 'hard',
      points: 100,
      locked: false,
    },
    {
      id: 2,
      title: language === 'fr' ? 'Liste chaînée' : 'Linked List',
      description: language === 'fr'
        ? 'Créez une liste chaînée avec les opérations de base.'
        : 'Create a linked list with basic operations.',
      language: 'C',
      difficulty: 'medium',
      points: 75,
      locked: false,
    },
    {
      id: 3,
      title: language === 'fr' ? 'Gestion mémoire' : 'Memory Management',
      description: language === 'fr'
        ? 'Implémentez un allocateur de mémoire simple.'
        : 'Implement a simple memory allocator.',
      language: 'Rust',
      difficulty: 'hard',
      points: 150,
      locked: true,
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          {language === 'fr' ? 'Défis' : 'Challenges'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'fr'
            ? 'Relevez des défis quotidiens et gagnez des points bonus!'
            : 'Take on daily challenges and earn bonus points!'}
        </p>
      </motion.div>

      {/* Daily Challenge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-red-500/20 border border-yellow-500/30 p-8"
      >
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-card/80 backdrop-blur rounded-full">
            <Calendar className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-mono font-bold text-foreground">{dailyChallenge.timeLeft}</span>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-semibold">
                {language === 'fr' ? 'DÉFI DU JOUR' : 'DAILY CHALLENGE'}
              </span>
              <span className="flex items-center gap-1 text-sm font-semibold text-yellow-400">
                <Star className="w-4 h-4" />
                +{dailyChallenge.points} pts
              </span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{dailyChallenge.title}</h2>
            <p className="text-muted-foreground mb-4">{dailyChallenge.description}</p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {dailyChallenge.language}
              </span>
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold",
                dailyChallenge.difficulty === 'easy' && "bg-green-500/20 text-green-400",
                dailyChallenge.difficulty === 'medium' && "bg-yellow-500/20 text-yellow-400",
                dailyChallenge.difficulty === 'hard' && "bg-red-500/20 text-red-400"
              )}>
                {dailyChallenge.difficulty}
              </span>
            </div>
          </div>
        </div>
        <Button className="mt-6 w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:opacity-90">
          {language === 'fr' ? 'Relever le défi' : 'Take the Challenge'}
        </Button>
      </motion.div>

      {/* Challenge List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">
          {language === 'fr' ? 'Autres défis' : 'Other Challenges'}
        </h2>
        
        {challenges.map((challenge, idx) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className={cn(
              "bg-card rounded-xl border border-border p-6 transition-all",
              challenge.locked ? "opacity-60" : "hover:border-primary/50 cursor-pointer"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center",
                  challenge.locked ? "bg-muted" : "bg-primary/20"
                )}>
                  {challenge.locked ? (
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  ) : (
                    <Trophy className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground">{challenge.language}</span>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-semibold",
                      challenge.difficulty === 'easy' && "bg-green-500/20 text-green-400",
                      challenge.difficulty === 'medium' && "bg-yellow-500/20 text-yellow-400",
                      challenge.difficulty === 'hard' && "bg-red-500/20 text-red-400"
                    )}>
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                  <Star className="w-4 h-4" />
                  +{challenge.points}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
