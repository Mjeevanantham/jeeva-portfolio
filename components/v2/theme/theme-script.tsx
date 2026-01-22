/**
 * Theme Script
 * 
 * Prevents flash of unstyled content by setting theme before React hydrates.
 * Must be placed in <head> before any content.
 */

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('v2-theme');
              var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              var resolvedTheme = theme === 'system' || !theme ? systemTheme : theme;
              
              if (resolvedTheme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {
              // Fallback to system preference
              if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
              }
            }
          })();
        `,
      }}
    />
  );
}
