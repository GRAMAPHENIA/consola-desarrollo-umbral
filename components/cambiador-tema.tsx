"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import React from "react"

export function CambiadorTema() {
  const { theme, setTheme } = useTheme()

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      data-testid="theme-toggle"
    >
      <Sun 
        className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" 
        data-testid="sun-icon"
      />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )
}
