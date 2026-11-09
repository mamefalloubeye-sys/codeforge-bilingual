export type ProgrammingLanguage = 'python' | 'c' | 'rust' | 'latex' | 'scilab' | 'robotics';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Exercise {
  id: string;
  language: ProgrammingLanguage;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  difficulty: Difficulty;
  category: string;
  starterCode: string;
  solution: string;
  expectedOutput: string;
  hints: {
    fr: string[];
    en: string[];
  };
  explanation: {
    fr: string;
    en: string;
  };
  order: number;
}

export interface UserProgress {
  userId: string;
  userLanguage: ProgrammingLanguage;
  completedExercises: string[];
  exerciseHistory: ExerciseAttempt[];
  streak: number;
  lastActivityDate: string;
  totalPoints: number;
  badges: string[];
}

export interface ExerciseAttempt {
  exerciseId: string;
  timestamp: string;
  code: string;
  passed: boolean;
  output: string;
}

export interface EditorSettings {
  theme: 'vs-dark' | 'light' | 'hc-black';
  fontSize: number;
  autoComplete: boolean;
  lineNumbers: boolean;
  minimap: boolean;
  wordWrap: boolean;
}

export interface LanguageInfo {
  id: ProgrammingLanguage;
  name: string;
  icon: string;
  description: {
    fr: string;
    en: string;
  };
  color: string;
  gradient: string;
}

export const LANGUAGES: LanguageInfo[] = [
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    description: {
      fr: 'Langage polyvalent idéal pour la POO, l\'IA et le scripting',
      en: 'Versatile language ideal for OOP, AI and scripting',
    },
    color: 'python',
    gradient: 'language-badge-python',
  },
  {
    id: 'c',
    name: 'C',
    icon: '⚙️',
    description: {
      fr: 'Langage système bas niveau pour la programmation performante',
      en: 'Low-level system language for high-performance programming',
    },
    color: 'c-lang',
    gradient: 'language-badge-c',
  },
  {
    id: 'rust',
    name: 'Rust',
    icon: '🦀',
    description: {
      fr: 'Langage sûr et performant pour la programmation système',
      en: 'Safe and performant language for system programming',
    },
    color: 'rust',
    gradient: 'language-badge-rust',
  },
  {
    id: 'latex',
    name: 'LaTeX',
    icon: '📝',
    description: {
      fr: 'Système de composition de documents scientifiques',
      en: 'Document typesetting system for scientific documents',
    },
    color: 'latex',
    gradient: 'language-badge-latex',
  },
  {
    id: 'scilab',
    name: 'Scilab',
    icon: '📊',
    description: {
      fr: 'Logiciel de calcul numérique et scientifique',
      en: 'Numerical computation software for scientific computing',
    },
    color: 'scilab',
    gradient: 'language-badge-scilab',
  },
  {
    id: 'robotics',
    name: 'Robotics & AI',
    icon: '🤖',
    description: {
      fr: 'Frameworks et outils pour la robotique et l\'intelligence artificielle',
      en: 'Frameworks and tools for robotics and artificial intelligence',
    },
    color: 'robotics',
    gradient: 'language-badge-robotics',
  },
];
