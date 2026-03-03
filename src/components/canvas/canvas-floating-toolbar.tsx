'use client';

import { useState } from "react";
import { ChevronDown, Palette, Save, Wand2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useCanvas } from "./canvas-context";
import { Button } from "../ui/button";
import AiInput from "../web/AiInput";
import ThemeSelector from "./theme-selector";
import { Separator } from "../ui/separator";
import { parseThemeColors } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CanvasFloatingToolbar = () => {
  const { themes, theme: currentTheme, setTheme } = useCanvas();
  const [promptText, setPromptText] = useState<string>("");

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 px-4 py-2 bg-background dark:bg-gray-950 rounded-full shadow-xl border">

        {/* AI BUTTON */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg shadow-purple-200/50"
            >
              <Wand2 className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-3 rounded-xl shadow-lg border mt-2">
            <AiInput
              promptText={promptText}
              setPromptText={setPromptText}
            />
          </PopoverContent>
        </Popover>

        {/* THEME PREVIEW */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-3 px-3 py-2 cursor-pointer">
              <Palette className="size-4" />

              <div className="flex gap-1">
                {themes?.slice(0, 4).map((theme) => {
                  const colors = parseThemeColors(theme.style);

                  return (
                    <div
                      key={theme.id}
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTheme(theme.id);
                      }}
                      className={cn(
                        "w-5 h-5 rounded-full cursor-pointer",
                        currentTheme?.id === theme.id &&
                          "ring-2 ring-offset-1"
                      )}
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                      }}
                    />
                  );
                })}
              </div>

              <div className="flex items-center gap-1 text-sm">
                {themes.length > 4 && `+${themes.length - 4} more`}
                <ChevronDown className="size-4" />
              </div>
            </div>
          </PopoverTrigger>

          <PopoverContent className="px-2 py-2 rounded-xl shadow border">
            <ThemeSelector />
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="h-6" />

        {/* SAVE BUTTON */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <Save className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default CanvasFloatingToolbar;