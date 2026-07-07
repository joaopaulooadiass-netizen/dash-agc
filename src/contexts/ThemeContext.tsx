'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const DARK: Record<string, string> = {
  '--color-bg-primary':     '#071527',
  '--color-bg-secondary':   '#0C1D33',
  '--color-bg-tertiary':    '#16283F',
  '--color-bg-card':        '#0F2036',
  '--color-text-primary':   '#FDFAF3',
  '--color-text-secondary': '#C5CCD4',
  '--color-text-muted':     '#7C8798',
  '--color-text-tertiary':  '#94A0AE',
  '--color-border-subtle':  '#1B2C42',
  '--color-border-default': '#24374F',
  '--color-border-strong':  '#354962',
  '--color-accent':         '#CC9B49',
  '--color-accent-hover':   '#D9B165',
  '--color-accent-muted':   'rgba(204,155,73,0.15)',
}

const LIGHT: Record<string, string> = {
  '--color-bg-primary':     '#FDFAF3',
  '--color-bg-secondary':   '#F4EEE4',
  '--color-bg-tertiary':    '#ECE9E1',
  '--color-bg-card':        '#FFFFFF',
  '--color-text-primary':   '#031225',
  '--color-text-secondary': '#203147',
  '--color-text-muted':     '#596571',
  '--color-text-tertiary':  '#7A8694',
  '--color-border-subtle':  '#ECE6DA',
  '--color-border-default': '#E2DDD5',
  '--color-border-strong':  '#C9BFAC',
  '--color-accent':         '#A16F25',
  '--color-accent-hover':   '#CC9B49',
  '--color-accent-muted':   'rgba(161,111,37,0.12)',
}

function applyTheme(theme: Theme) {
  const vars = theme === 'light' ? LIGHT : DARK
  const root = document.documentElement
  Object.entries(vars).forEach(([key, val]) => root.style.setProperty(key, val))
  root.setAttribute('data-theme', theme)
}

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'dark', toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    // Modo claro DESATIVADO por ora — há dezenas de cores/bordas hardcoded que o
    // quebram (ver docs/divida-tecnica-tema.md). O ThemeContext e os mapas
    // DARK/LIGHT ficam prontos pra reativar: basta restaurar a leitura do
    // localStorage e religar os toggles na Sidebar e em Configurações.
    applyTheme('dark')
  }, [])

  function toggle() {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', next)
      applyTheme(next)
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
