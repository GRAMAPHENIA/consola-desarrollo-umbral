import { Brain } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PuntosNLPProps {
  puntos: number
}

export function PuntosNLP({ puntos }: PuntosNLPProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 cursor-help">
            <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
              <Brain className="h-4 w-4 text-primary" />
              <span>{puntos}</span>
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">Puntos de Programación Neurolingüística</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
