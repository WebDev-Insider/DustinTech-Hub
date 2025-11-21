'use client';

import { useTheme } from './theme-provider';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggle}
      className="ml-1"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
