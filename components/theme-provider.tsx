"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("yiz-theme")) as Theme | null
    if (stored === "dark") {
      setThemeState("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    document.documentElement.classList.toggle("dark", next === "dark")
    try {
      localStorage.setItem("yiz-theme", next)
    } catch {
      // ignore
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "light" ? "dark" : "light"
      document.documentElement.classList.toggle("dark", next === "dark")
      try {
        localStorage.setItem("yiz-theme", next)
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  return <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
