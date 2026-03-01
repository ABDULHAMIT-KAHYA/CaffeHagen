import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext";
import { ChevronDown, Snowflake, Moon, Gift } from "lucide-react";

export function ThemeToggle({ scrolled }: { scrolled: boolean }) {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center gap-1 text-sm font-medium tracking-widest uppercase transition-colors hover:text-accent focus:outline-none ${
          scrolled ? "text-foreground" : "text-cream"
        }`}
      >
        Theme
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => setTheme("winter")} className="gap-2">
          <Snowflake className="h-4 w-4" />
          Winter
          {theme === "winter" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("ramadan")} className="gap-2">
          <Moon className="h-4 w-4" />
          Ramadan
          {theme === "ramadan" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("christmas")} className="gap-2">
          <Gift className="h-4 w-4" />
          Christmas
          {theme === "christmas" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("default")} className="gap-2">
          <span className="h-4 w-4 block bg-foreground/20 rounded-full" />
          Default
          {theme === "default" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
