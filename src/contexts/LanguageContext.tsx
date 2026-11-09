import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.exercises': 'Exercices',
    'nav.tutorials': 'Tutoriels',
    'nav.challenges': 'Défis',
    'nav.progress': 'Progression',
    'nav.settings': 'Paramètres',
    
    // Languages
    'lang.python': 'Python',
    'lang.c': 'C',
    'lang.rust': 'Rust',
    'lang.latex': 'LaTeX',
    'lang.scilab': 'Scilab',
    'lang.robotics': 'Robotique & IA',
    
    // Dashboard
    'dashboard.welcome': 'Bienvenue sur CodeTrainer Pro Ultimate',
    'dashboard.subtitle': 'Maîtrisez la programmation et la POO avec des exercices interactifs',
    'dashboard.startLearning': 'Commencer à apprendre',
    'dashboard.continueProgress': 'Continuer ma progression',
    'dashboard.dailyChallenge': 'Défi du jour',
    'dashboard.completedExercises': 'Exercices complétés',
    'dashboard.currentStreak': 'Série en cours',
    'dashboard.totalPoints': 'Points totaux',
    'dashboard.recentActivity': 'Activité récente',
    'dashboard.selectLanguage': 'Sélectionnez un langage',
    'dashboard.welcomeTag': 'Bienvenue',
    
    // Exercises
    'exercises.chooseLanguage': 'Choisissez un langage pour accéder aux exercices',
    'exercises.count': 'exercices',
    'exercises.start': 'Commencer →',
    'exercises.progression': 'Progression',
    'exercises.completed': 'complétés',
    
    // Language
    'language.notFound': 'Langage non trouvé',
    
    // Tutorials
    'tutorials.title': 'Tutoriels',
    'tutorials.subtitle': 'Apprenez les concepts de base avec nos tutoriels interactifs',
    'tutorials.lessons': 'leçons',
    
    // Challenges
    'challenges.subtitle': 'Relevez des défis quotidiens et gagnez des points bonus!',
    'challenges.daily': 'Défi du jour',
    'challenges.dailyDescription': 'Implémentez une fonction qui calcule le n-ième nombre de Fibonacci.',
    'challenges.take': 'Relever le défi',
    'challenges.others': 'Autres défis',
    
    // Progress
    'progress.overall': 'Progression globale',
    'progress.noActivity': 'Aucune activité récente. Commencez un exercice !',
    
    // Settings
    'settings.theme.dark': 'Sombre',
    'settings.theme.light': 'Clair',
    'settings.theme.highContrast': 'Contraste élevé',
    
    
    // Exercises
    'exercise.title': 'Titre de l\'exercice',
    'exercise.description': 'Description',
    'exercise.difficulty': 'Difficulté',
    'exercise.easy': 'Facile',
    'exercise.medium': 'Intermédiaire',
    'exercise.hard': 'Difficile',
    'exercise.run': 'Exécuter',
    'exercise.submit': 'Soumettre',
    'exercise.reset': 'Réinitialiser',
    'exercise.hint': 'Indice',
    'exercise.solution': 'Voir la solution',
    'exercise.nextExercise': 'Exercice suivant',
    'exercise.previousExercise': 'Exercice précédent',
    'exercise.console': 'Console',
    'exercise.output': 'Sortie',
    'exercise.expected': 'Résultat attendu',
    'exercise.success': 'Bravo ! Exercice réussi !',
    'exercise.failure': 'Pas tout à fait correct. Réessayez !',
    'exercise.error': 'Erreur dans le code',
    
    // Editor
    'editor.theme': 'Thème',
    'editor.fontSize': 'Taille de police',
    'editor.autoComplete': 'Auto-complétion',
    'editor.lineNumbers': 'Numéros de ligne',
    
    // Settings
    'settings.language': 'Langue de l\'interface',
    'settings.editorSettings': 'Paramètres de l\'éditeur',
    'settings.notifications': 'Notifications',
    'settings.dailyReminder': 'Rappel quotidien',
    'settings.soundEffects': 'Effets sonores',
    'settings.resetProgress': 'Réinitialiser la progression',
    'settings.exportData': 'Exporter les données',
    
    // Progress
    'progress.overview': 'Vue d\'ensemble',
    'progress.byLanguage': 'Par langage',
    'progress.history': 'Historique',
    'progress.achievements': 'Succès',
    'progress.badges': 'Badges',
    
    // Common
    'common.loading': 'Chargement...',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.close': 'Fermer',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.days': 'jours',
    'common.hours': 'heures',
    'common.minutes': 'minutes',
    'common.menu': 'Menu',
    'exercises.all': 'Tous',
    'language.tutorials': 'Apprenez les concepts de base',
    'language.exercises': 'Pratiquez avec des exercices guidés',
    'language.challenges': 'Relevez des défis avancés',
    'notFound.title': 'Oops ! Page introuvable',
    'exercise.completed': 'Complété',
    'exercise.moreHints': 'Plus d\'indices',
    'exercise.runHint': 'Exécutez votre code pour voir le résultat...',
    'exercises.noResults': 'Aucun exercice disponible pour ce filtre.',
    'progress.subtitle': 'Suivez votre progression et vos accomplissements',
    'progress.completedExercises': 'exercices complétés',
    'progress.passed': 'Réussi',
    'progress.failed': 'Échoué',
    'settings.exported': 'Données exportées!',
    'settings.resetConfirm': 'Êtes-vous sûr de vouloir réinitialiser votre progression ? Cette action est irréversible.',
    'settings.resetDone': 'Progression réinitialisée',
    'settings.subtitle': 'Personnalisez votre expérience CodeTrainer',
    'settings.interfaceLanguage': 'Langue de l\'interface',
    'settings.interfaceLanguageDesc': 'Choisissez la langue de l\'application',
    'settings.editorThemeLabel': 'Thème de l\'éditeur de code',
    'settings.fontSize': 'Taille de la police',
    'settings.dataManagement': 'Gestion des données',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.exercises': 'Exercises',
    'nav.tutorials': 'Tutorials',
    'nav.challenges': 'Challenges',
    'nav.progress': 'Progress',
    'nav.settings': 'Settings',
    
    // Languages
    'lang.python': 'Python',
    'lang.c': 'C',
    'lang.rust': 'Rust',
    'lang.latex': 'LaTeX',
    'lang.scilab': 'Scilab',
    'lang.robotics': 'Robotics & AI',
    
    // Dashboard
    'dashboard.welcome': 'Welcome to CodeTrainer Pro Ultimate',
    'dashboard.subtitle': 'Master programming and OOP with interactive exercises',
    'dashboard.startLearning': 'Start Learning',
    'dashboard.continueProgress': 'Continue Progress',
    'dashboard.dailyChallenge': 'Daily Challenge',
    'dashboard.completedExercises': 'Completed Exercises',
    'dashboard.currentStreak': 'Current Streak',
    'dashboard.totalPoints': 'Total Points',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.selectLanguage': 'Select a language',
    'dashboard.welcomeTag': 'Welcome',
    
    // Exercises
    'exercises.chooseLanguage': 'Choose a language to access exercises',
    'exercises.count': 'exercises',
    'exercises.start': 'Start →',
    'exercises.progression': 'Progress',
    'exercises.completed': 'completed',
    
    // Language
    'language.notFound': 'Language not found',
    
    // Tutorials
    'tutorials.title': 'Tutorials',
    'tutorials.subtitle': 'Learn the basics with our interactive tutorials',
    'tutorials.lessons': 'lessons',
    
    // Challenges
    'challenges.subtitle': 'Take on daily challenges and earn bonus points!',
    'challenges.daily': 'Daily Challenge',
    'challenges.dailyDescription': 'Implement a function that calculates the n-th Fibonacci number.',
    'challenges.take': 'Take the Challenge',
    'challenges.others': 'Other Challenges',
    
    // Progress
    'progress.overall': 'Overall Progress',
    'progress.noActivity': 'No recent activity. Start an exercise!',
    
    // Settings
    'settings.theme.dark': 'Dark',
    'settings.theme.light': 'Light',
    'settings.theme.highContrast': 'High Contrast',
    
    
    // Exercises
    'exercise.title': 'Exercise Title',
    'exercise.description': 'Description',
    'exercise.difficulty': 'Difficulty',
    'exercise.easy': 'Easy',
    'exercise.medium': 'Medium',
    'exercise.hard': 'Hard',
    'exercise.run': 'Run',
    'exercise.submit': 'Submit',
    'exercise.reset': 'Reset',
    'exercise.hint': 'Hint',
    'exercise.solution': 'View Solution',
    'exercise.nextExercise': 'Next Exercise',
    'exercise.previousExercise': 'Previous Exercise',
    'exercise.console': 'Console',
    'exercise.output': 'Output',
    'exercise.expected': 'Expected Result',
    'exercise.success': 'Well done! Exercise completed!',
    'exercise.failure': 'Not quite right. Try again!',
    'exercise.error': 'Error in code',
    
    // Editor
    'editor.theme': 'Theme',
    'editor.fontSize': 'Font Size',
    'editor.autoComplete': 'Auto-complete',
    'editor.lineNumbers': 'Line Numbers',
    
    // Settings
    'settings.language': 'Interface Language',
    'settings.editorSettings': 'Editor Settings',
    'settings.notifications': 'Notifications',
    'settings.dailyReminder': 'Daily Reminder',
    'settings.soundEffects': 'Sound Effects',
    'settings.resetProgress': 'Reset Progress',
    'settings.exportData': 'Export Data',
    
    // Progress
    'progress.overview': 'Overview',
    'progress.byLanguage': 'By Language',
    'progress.history': 'History',
    'progress.achievements': 'Achievements',
    'progress.badges': 'Badges',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.days': 'days',
    'common.hours': 'hours',
    'common.minutes': 'minutes',
    'common.menu': 'Menu',
    'exercises.all': 'All',
    'language.tutorials': 'Learn the basic concepts',
    'language.exercises': 'Practice with guided exercises',
    'language.challenges': 'Take on advanced challenges',
    'notFound.title': 'Oops! Page not found',
    'exercise.completed': 'Completed',
    'exercise.moreHints': 'More hints',
    'exercise.runHint': 'Run your code to see the output...',
    'exercises.noResults': 'No exercises available for this filter.',
    'progress.subtitle': 'Track your progress and achievements',
    'progress.completedExercises': 'exercises completed',
    'progress.passed': 'Passed',
    'progress.failed': 'Failed',
    'settings.exported': 'Data exported!',
    'settings.resetDone': 'Progress reset',
    'settings.subtitle': 'Customize your CodeTrainer experience',
    'settings.interfaceLanguage': 'Interface Language',
    'settings.interfaceLanguageDesc': 'Choose the application language',
    'settings.editorThemeLabel': 'Code editor theme',
    'settings.fontSize': 'Font size',
    'settings.dataManagement': 'Data Management',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('codetrainer-language');
    return (saved as Language) || 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('codetrainer-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
