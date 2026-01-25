import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Code2, 
  BookOpen, 
  Trophy, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LANGUAGES } from '@/types';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function AppSidebar() {
  const { t, language: appLanguage } = useLanguage();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const mainNavItems = [
    { path: '/', icon: Home, label: 'nav.dashboard' },
    { path: '/exercises', icon: Code2, label: 'nav.exercises' },
    { path: '/tutorials', icon: BookOpen, label: 'nav.tutorials' },
    { path: '/challenges', icon: Trophy, label: 'nav.challenges' },
    { path: '/progress', icon: BarChart3, label: 'nav.progress' },
    { path: '/settings', icon: Settings, label: 'nav.settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0, width: collapsed ? 72 : 280 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="font-bold text-lg text-sidebar-foreground">CodeTrainer</h1>
              <p className="text-xs text-muted-foreground">Pro Ultimate</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className={cn(
          "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3",
          collapsed && "text-center"
        )}>
          {!collapsed && 'Menu'}
        </p>
        
        {mainNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
              isActive(item.path)
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors",
              isActive(item.path) ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"
            )} />
            {!collapsed && (
              <span className="font-medium">{t(item.label)}</span>
            )}
            {isActive(item.path) && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 w-1 h-8 bg-sidebar-primary rounded-r-full"
              />
            )}
          </NavLink>
        ))}

        {/* Language Sections */}
        <div className="mt-6 pt-4 border-t border-sidebar-border">
          <p className={cn(
            "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3",
            collapsed && "text-center"
          )}>
            {!collapsed && (appLanguage === 'fr' ? 'Langages' : 'Languages')}
          </p>
          
          {LANGUAGES.map((lang) => (
            <NavLink
              key={lang.id}
              to={`/language/${lang.id}`}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group mb-1",
                location.pathname.includes(`/language/${lang.id}`)
                  ? "bg-sidebar-accent"
                  : "hover:bg-sidebar-accent/50"
              )}
            >
              <span className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-lg",
                lang.gradient
              )}>
                {lang.icon}
              </span>
              {!collapsed && (
                <span className="font-medium text-sidebar-foreground">{lang.name}</span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-3 border-t border-sidebar-border flex items-center justify-center hover:bg-sidebar-accent transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
    </motion.aside>
  );
}
