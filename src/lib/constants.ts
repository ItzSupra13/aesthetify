export type ProjectType = {
  id: string;
  name: string;
  theme: string;
  thumbnail?: string;
  frames: FrameType[];
  createdAt: Date;
  updatedAt?: Date;
}

export type FrameType = {
  id: string;
  title: string;
  htmlContent: string;
  projectId?: string;
  createdAt: string;
  updatedAt?: string;

  isLoading?: boolean;
}

export const TOOL_MODE_ENUM = {
  SELECT: "SELECT",
  HAND: "HAND",
} as const;

export type ToolModeType = keyof typeof TOOL_MODE_ENUM

export const MODELS = [
  {
    chef: "OpenAI",
    chefSlug: "openai",
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    providers: ["openai", "azure"],
  },
  {
    chef: "Anthropic",
    chefSlug: "anthropic",
    id: "claude-opus-4-20250514",
    name: "Claude 4 Opus",
    providers: ["anthropic", "azure", "google-vertex", "amazon-bedrock"],
  },
  {
    chef: "Google",
    chefSlug: "google",
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    providers: ["google", "google-vertex"],
  },
];

export const suggestions = [
  "What are the latest trends in AI?",
  "How does machine learning work?",
  "Explain quantum computing",
  "Best practices for React development",
];


export interface ThemeType {
  id: string;
  name: string;
  style: string;
}

export const FONT_VARIABLES = `
    --font-sans: "Plus Jakarta Sans";
    --font-heading: "Space Grotesk";
    --font-serif: "Playfair Display";
    --font-mono: "JetBrains Mono";
`

export const BASE_VARIABLES = `
${FONT_VARIABLES}

--radius: 1.3rem;
--shadow-2xs: 0 0 #0000;
--shadow-xs: 0 1px 2px rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-md: 0 6px 12px -2px rgb(0 0 0 / 0.15);

--tracking-tight: -0.025em;
--tracking-normal: 0em;
--tracking-wide: 0.025em;
`

export const OCEAN_BREEZE_THEME = `
/* DARK ROOT ONLY */

--background: #000000;
--foreground: #ffffff;

--card: #0f0f0f;
--card-foreground: #d9d9d9;

--popover: #000000;
--popover-foreground: #ffffff;

--primary: #2b65ff;
--primary-foreground: #ffffff;

--secondary: #ffffff;
--secondary-foreground: #0e142b;

--muted: #181818;
--muted-foreground: #7b7e8c;

--accent: #000e39;
--accent-foreground: #2b65ff;

--destructive: #ff6c35;
--destructive-foreground: #ffffff;

--border: #26272e;
--input: #162151;
--ring: #2e6aff;

--chart-1: #2e6aff;
--chart-2: #00cdcc;
--chart-3: #f9ff40;
--chart-4: #00eeba;
--chart-5: #ff2822;

--sidebar: #0f0f0f;
--sidebar-foreground: #d9d9d9;
--sidebar-primary: #2e6aff;
--sidebar-primary-foreground: #ffffff;
--sidebar-accent: #000e39;
--sidebar-accent-foreground: #2b65ff;
--sidebar-border: #323e62;
--sidebar-ring: #2e6aff;
`;

export const COFFEE_THEME = `
 --background: #080604;
  --foreground: #e8e0d6;
  --card: #12100c;
  --card-foreground: #e8e0d6;
  --popover: #12100c;
  --popover-foreground: #e8e0d6;
  --primary: #d97706;
  --primary-foreground: #1c1004;
  --secondary: #211c14;
  --secondary-foreground: #b8a88e;
  --muted: #1a1610;
  --muted-foreground: #8e806e;
  --accent: #2c2010;
  --accent-foreground: #fbbf24;
  --destructive: #ef4444;
  --destructive-foreground: #1a0606;
  --border: #2a231a;
  --input: #2a231a;
  --ring: #d97706;
  --chart-1: #d97706;
  --chart-2: #f59e0b;
  --chart-3: #ca8a04;
  --chart-4: #fbbf24;
  --chart-5: #b45309;
  --sidebar: #0a0806;
  --sidebar-foreground: #e8e0d6;
  --sidebar-primary: #d97706;
  --sidebar-primary-foreground: #1c1004;
  --sidebar-accent: #2c2010;
  --sidebar-accent-foreground: #fbbf24;
  --sidebar-border: #2a231a;
  --sidebar-ring: #d97706;
  --font-sans: "DM Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-serif: "Lora", "Georgia", "Times New Roman", serif;
  --font-mono: "IBM Plex Mono", "JetBrains Mono", "Fira Code", monospace;
  --radius: 0.375rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 4px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.5;
  --shadow-color: #020000;
  --shadow-2xs: 0 1px 4px 0px hsl(0 100.0000% 0.3922% / 0.25);
  --shadow-xs: 0 1px 4px 0px hsl(0 100.0000% 0.3922% / 0.25);
  --shadow-sm: 0 1px 4px 0px hsl(0 100.0000% 0.3922% / 0.50), 0 1px 2px -1px hsl(0 100.0000% 0.3922% / 0.50);
  --shadow: 0 1px 4px 0px hsl(0 100.0000% 0.3922% / 0.50), 0 1px 2px -1px hsl(0 100.0000% 0.3922% / 0.50);
  --shadow-md: 0 1px 4px 0px hsl(0 100.0000% 0.3922% / 0.50), 0 2px 4px -1px hsl(0 100.0000% 0.3922% / 0.50);
  --shadow-lg: 0 1px 4px 0px hsl(0 100.0000% 0.3922% / 0.50), 0 4px 6px -1px hsl(0 100.0000% 0.3922% / 0.50);
  --shadow-xl: 0 1px 4px 0px hsl(0 100.0000% 0.3922% / 0.50), 0 8px 10px -1px hsl(0 100.0000% 0.3922% / 0.50);
  --shadow-2xl: 0 1px 4px 0px hsl(0 100.0000% 0.3922% / 1.25);`

export const THEME_LIST: ThemeType[] = [
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    style: OCEAN_BREEZE_THEME,
  },
  {
    id: "coffee",
    name: "Coffee",
    style: COFFEE_THEME,
  },
]
  

export function parseThemeColors(style: string) {
  const colors: Record<string, string> = {}
  const matches = style.matchAll(/--([a-z-]+):\s*([^;]+)/g);
  for (const match of matches) colors[match[1]] = match[2].trim();
  return colors;
}