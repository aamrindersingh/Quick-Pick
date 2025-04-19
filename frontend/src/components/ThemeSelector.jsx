import { useState } from "react";
import { PaletteIcon, SunIcon, MoonIcon, MonitorIcon, CheckIcon } from "lucide-react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { motion, AnimatePresence } from "framer-motion";

function ThemeSelector() {
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  // Get current theme object
  const currentTheme = THEMES.find(t => t.name === theme) || THEMES[0];
  
  // Get appropriate icon based on theme name
  const getThemeIcon = (themeName) => {
    if (themeName.includes('light')) return <SunIcon className="size-4" />;
    if (themeName.includes('dark')) return <MoonIcon className="size-4" />;
    return <MonitorIcon className="size-4" />;
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-circle relative group hover:bg-primary/10 transition-colors duration-300"
      >
        <PaletteIcon className="size-6 text-base-content group-hover:text-primary transition-colors duration-300" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for closing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            
            {/* Theme menu */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.35 }}
              className="absolute right-0 mt-2 z-50 p-3 shadow-2xl bg-base-200/90 backdrop-blur-xl rounded-2xl
                w-72 border border-base-content/10"
            >
              <div className="p-2 mb-2">
                <h3 className="font-bold text-lg mb-1">Theme Settings</h3>
                <p className="text-sm text-base-content/70">Customize your interface</p>
              </div>
              
              <div className="space-y-1">
                {THEMES.map((themeOption) => (
                  <motion.button
                    key={themeOption.name}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full p-3 rounded-xl flex items-center gap-3 transition-all
                      ${theme === themeOption.name
                        ? "bg-primary text-primary-content"
                        : "hover:bg-base-content/10"
                      }
                    `}
                    onClick={() => {
                      setTheme(themeOption.name);
                      setIsOpen(false);
                    }}
                  >
                    <div className={`
                      size-8 rounded-lg flex items-center justify-center
                      ${theme === themeOption.name ? 'bg-primary-content/20' : 'bg-base-content/5'}
                    `}>
                      {getThemeIcon(themeOption.name)}
                    </div>
                    
                    <div className="flex-1 text-left">
                      <span className="font-medium">{themeOption.label}</span>
                    </div>

                    {/* THEME PREVIEW COLORS */}
                    <div className="flex gap-1">
                      {themeOption.colors.map((color, i) => (
                        <span 
                          key={i} 
                          className="size-4 rounded-full transition-transform hover:scale-125" 
                          style={{ backgroundColor: color }} 
                        />
                      ))}
                    </div>
                    
                    {theme === themeOption.name && (
                      <CheckIcon className="size-4 ml-1" />
                    )}
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-3 pt-3 border-t border-base-content/10 text-xs text-center text-base-content/60">
                Current theme: {currentTheme.label}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemeSelector;
