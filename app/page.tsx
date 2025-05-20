import { ThemeProvider } from "@/components/theme-provider"
import ConsolaDev from "@/components/consola-dev"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="tema-consola">
      <main className="min-h-screen flex items-center justify-center p-4">
        <ConsolaDev />
      </main>
    </ThemeProvider>
  )
}
