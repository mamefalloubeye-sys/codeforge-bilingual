import Editor, { OnChange } from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Lightbulb, Eye, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Exercise, ProgrammingLanguage } from '@/types';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  exercise: Exercise;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

const languageMap: Record<ProgrammingLanguage, string> = {
  python: 'python',
  c: 'c',
  rust: 'rust',
  latex: 'latex',
  scilab: 'scilab',
  robotics: 'python',
};

export function CodeEditor({ exercise, onNext, onPrevious, hasNext, hasPrevious }: CodeEditorProps) {
  const { language: appLang, t } = useLanguage();
  const { markExerciseComplete, isExerciseCompleted } = useProgress();
  
  const [code, setCode] = useState(exercise.starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [passed, setPassed] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const handleCodeChange: OnChange = useCallback((value) => {
    setCode(value || '');
  }, []);

  const simulateExecution = useCallback(() => {
    setIsRunning(true);
    setOutput('');
    
    setTimeout(() => {
      // Simple simulation - in real app, this would call a sandbox API
      let simulatedOutput = '';
      
      if (code.includes('print') || code.includes('printf') || code.includes('println')) {
        // Extract string from print statements
        const match = code.match(/(?:print|printf|println!?)\s*\(\s*["']([^"']+)["']/);
        if (match) {
          simulatedOutput = match[1].replace(/\\n/g, '');
        }
      }
      
      const isPassed = simulatedOutput.trim() === exercise.expectedOutput.trim() || 
                       code.trim() === exercise.solution.trim();
      
      setPassed(isPassed);
      setOutput(isPassed 
        ? `✅ ${exercise.expectedOutput}\n\n${t('exercise.success')}`
        : `❌ ${simulatedOutput || 'No output'}\n\n${t('exercise.failure')}`
      );
      
      markExerciseComplete(exercise.id, code, simulatedOutput, isPassed);
      setIsRunning(false);
    }, 1000);
  }, [code, exercise, t, markExerciseComplete]);

  const resetCode = useCallback(() => {
    setCode(exercise.starterCode);
    setOutput('');
    setPassed(false);
    setShowHint(false);
    setShowSolution(false);
  }, [exercise.starterCode]);

  const hints = exercise.hints[appLang];
  const completed = isExerciseCompleted(exercise.id);

  return (
    <div className="h-full flex flex-col lg:flex-row gap-4">
      {/* Exercise Info Panel */}
      <div className="lg:w-1/3 space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card rounded-xl border border-border p-5 card-elevated"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold",
              exercise.difficulty === 'easy' && "bg-green-500/20 text-green-400",
              exercise.difficulty === 'medium' && "bg-yellow-500/20 text-yellow-400",
              exercise.difficulty === 'hard' && "bg-red-500/20 text-red-400"
            )}>
              {t(`exercise.${exercise.difficulty}`)}
            </div>
            {completed && (
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                <Check className="w-3 h-3" />
                {t('exercise.completed')}
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-foreground mb-3">
            {exercise.title[appLang]}
          </h2>
          
          <p className="text-muted-foreground leading-relaxed">
            {exercise.description[appLang]}
          </p>

          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground mb-2">
              {t('exercise.expected')}:
            </h4>
            <code className="block bg-muted p-3 rounded-lg text-sm font-mono text-accent">
              {exercise.expectedOutput}
            </code>
          </div>
        </motion.div>

        {/* Hints */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-5"
        >
          <Button
            variant="ghost"
            onClick={() => setShowHint(!showHint)}
            className="w-full justify-between"
          >
            <span className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              {t('exercise.hint')}
            </span>
            <ChevronRight className={cn("w-4 h-4 transition-transform", showHint && "rotate-90")} />
          </Button>
          
          {showHint && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-3 space-y-2"
            >
              {hints.slice(0, hintIndex + 1).map((hint, idx) => (
                <p key={idx} className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                  💡 {hint}
                </p>
              ))}
              {hintIndex < hints.length - 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setHintIndex(hintIndex + 1)}
                >
                  {t('exercise.moreHints')}
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Solution */}
        <Button
          variant="outline"
          onClick={() => setShowSolution(!showSolution)}
          className="w-full gap-2"
        >
          <Eye className="w-4 h-4" />
          {t('exercise.solution')}
        </Button>
        
        {showSolution && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl border border-border p-4"
          >
            <pre className="text-sm font-mono text-foreground whitespace-pre-wrap overflow-x-auto">
              {exercise.solution}
            </pre>
            <p className="mt-4 text-sm text-muted-foreground border-t border-border pt-4">
              {exercise.explanation[appLang]}
            </p>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="flex-1 gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {t('exercise.previousExercise')}
          </Button>
          <Button
            onClick={onNext}
            disabled={!hasNext}
            className="flex-1 gap-2"
          >
            {t('exercise.nextExercise')}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Code Editor Panel */}
      <div className="lg:w-2/3 flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 bg-card rounded-xl border border-border overflow-hidden min-h-[400px]"
        >
          <div className="h-10 bg-muted flex items-center px-4 border-b border-border">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-4 text-sm text-muted-foreground font-mono">
              {exercise.id}.{languageMap[exercise.language]}
            </span>
          </div>
          
          <Editor
            height="100%"
            language={languageMap[exercise.language]}
            theme="vs-dark"
            value={code}
            onChange={handleCodeChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'JetBrains Mono, monospace',
              padding: { top: 16 },
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              wordWrap: 'on',
            }}
          />
        </motion.div>

        {/* Control Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={simulateExecution}
            disabled={isRunning}
            className="flex-1 gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Play className="w-4 h-4" />
            {isRunning ? t('common.loading') : t('exercise.run')}
          </Button>
          <Button
            variant="outline"
            onClick={resetCode}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {t('exercise.reset')}
          </Button>
        </div>

        {/* Console Output */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="h-10 bg-muted flex items-center px-4 border-b border-border">
            <span className="text-sm font-semibold text-foreground">
              {t('exercise.console')}
            </span>
          </div>
          <div className={cn(
            "p-4 font-mono text-sm min-h-[120px] whitespace-pre-wrap",
            passed ? "text-green-400" : output.includes('❌') ? "text-red-400" : "text-muted-foreground"
          )}>
            {output || t('exercise.runHint')}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
