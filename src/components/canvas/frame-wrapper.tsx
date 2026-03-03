import { BASE_VARIABLES, THEME_LIST } from '@/lib/constants';

export function getHTMLWrapper(
  html: string,
  title = 'Untitled',
  themeStyle?: string,
  frameId?: string,
) {
  const finalTheme = themeStyle || THEME_LIST[0].style;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title}</title>

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Tailwind CDN -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Tailwind Config -->
<script>

tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)"
      },
      borderRadius: {
        xl: "var(--radius)"
      }
    }
  }
}

</script>

<!-- Iconify -->
<script src="https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"></script>

<style>
:root {
  ${BASE_VARIABLES}
  ${finalTheme}
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
}

body {
  font-family: var(--font-sans);
  background: var(--background);
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
}

#root {
  width: 100%;
  min-height: 100vh;
}
</style>

</head>
<body class="bg-background text-foreground">

<div id="root">
${html}
</div>

<script>
(() => {
  const fid = '${frameId ?? ''}';

  const sendHeight = () => {
    const root = document.getElementById('root');
    if (!root) return;

    const height = Math.max(
      root.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      800
    );

    parent.postMessage(
      { type: 'FRAME_HEIGHT', frameId: fid, height },
      '*'
    );
  };

  window.addEventListener('load', sendHeight);
  setTimeout(sendHeight, 150);

  const observer = new ResizeObserver(sendHeight);
  observer.observe(document.body);
})();
</script>

</body>
</html>
`;
}