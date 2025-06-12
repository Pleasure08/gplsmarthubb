import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid2X2, Grid3X3, LayoutGrid } from "lucide-react"

interface GridSettingsProps {
  gridSize: string
  onGridSizeChange: (size: string) => void
}

export function GridSettings({ gridSize, onGridSizeChange }: GridSettingsProps) {
  return (
    <div className="flex items-center gap-4">
      <Select value={gridSize} onValueChange={onGridSizeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select grid size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2x2">
            <div className="flex items-center gap-2">
              <Grid2X2 className="h-4 w-4" />
              <span>2x2 Grid</span>
            </div>
          </SelectItem>
          <SelectItem value="3x3">
            <div className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              <span>3x3 Grid</span>
            </div>
          </SelectItem>
          <SelectItem value="3x4">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              <span>3x4 Grid</span>
            </div>
          </SelectItem>
          <SelectItem value="4x4">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              <span>4x4 Grid</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
} 