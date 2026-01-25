import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Globe, Palette, Bell, Download, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();
  const { progress, resetProgress } = useProgress();
  
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState('14');
  const [dailyReminder, setDailyReminder] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  const handleExportData = () => {
    const data = {
      progress,
      settings: {
        language,
        editorTheme,
        fontSize,
        dailyReminder,
        soundEffects,
      },
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codetrainer-data.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success(language === 'fr' ? 'Données exportées!' : 'Data exported!');
  };

  const handleResetProgress = () => {
    if (confirm(language === 'fr' 
      ? 'Êtes-vous sûr de vouloir réinitialiser votre progression? Cette action est irréversible.'
      : 'Are you sure you want to reset your progress? This action cannot be undone.')) {
      resetProgress();
      toast.success(language === 'fr' ? 'Progression réinitialisée' : 'Progress reset');
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-primary" />
          {t('nav.settings')}
        </h1>
        <p className="text-muted-foreground">
          {language === 'fr'
            ? 'Personnalisez votre expérience CodeTrainer'
            : 'Customize your CodeTrainer experience'}
        </p>
      </motion.div>

      {/* Language Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">{t('settings.language')}</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>{language === 'fr' ? 'Langue de l\'interface' : 'Interface Language'}</Label>
              <p className="text-sm text-muted-foreground">
                {language === 'fr' 
                  ? 'Choisissez la langue de l\'application'
                  : 'Choose the application language'}
              </p>
            </div>
            <Select value={language} onValueChange={(v) => setLanguage(v as 'fr' | 'en')}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="fr">🇫🇷 Français</SelectItem>
                <SelectItem value="en">🇬🇧 English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Editor Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-accent" />
          <h2 className="text-lg font-semibold text-foreground">{t('settings.editorSettings')}</h2>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>{t('editor.theme')}</Label>
              <p className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Thème de l\'éditeur de code' : 'Code editor theme'}
              </p>
            </div>
            <Select value={editorTheme} onValueChange={setEditorTheme}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="vs-dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="hc-black">High Contrast</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>{t('editor.fontSize')}</Label>
              <p className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Taille de la police' : 'Font size'}
              </p>
            </div>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="12">12px</SelectItem>
                <SelectItem value="14">14px</SelectItem>
                <SelectItem value="16">16px</SelectItem>
                <SelectItem value="18">18px</SelectItem>
                <SelectItem value="20">20px</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-yellow-400" />
          <h2 className="text-lg font-semibold text-foreground">{t('settings.notifications')}</h2>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>{t('settings.dailyReminder')}</Label>
              <p className="text-sm text-muted-foreground">
                {language === 'fr' 
                  ? 'Rappel pour les défis quotidiens'
                  : 'Reminder for daily challenges'}
              </p>
            </div>
            <Switch checked={dailyReminder} onCheckedChange={setDailyReminder} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>{t('settings.soundEffects')}</Label>
              <p className="text-sm text-muted-foreground">
                {language === 'fr'
                  ? 'Sons lors des réussites et erreurs'
                  : 'Sounds for successes and errors'}
              </p>
            </div>
            <Switch checked={soundEffects} onCheckedChange={setSoundEffects} />
          </div>
        </div>
      </motion.div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-6">
          {language === 'fr' ? 'Gestion des données' : 'Data Management'}
        </h2>
        
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={handleExportData}
          >
            <Download className="w-5 h-5" />
            {t('settings.exportData')}
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive border-destructive/50 hover:bg-destructive/10"
            onClick={handleResetProgress}
          >
            <Trash2 className="w-5 h-5" />
            {t('settings.resetProgress')}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
