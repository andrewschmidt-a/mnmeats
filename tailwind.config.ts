import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  daisyui: {
    themes: [
      {
        mn: {
          
          "primary": "#CA2231",
                    
          "secondary": "#43C8E7",
                    
          "accent": "#002F5D",
                    
          "neutral": "#e5e7eb",
                    
          "base-100": "#f3f4f6",
                    
          "info": "#0000ff",
                    
          "success": "#00ff00",
                    
          "warning": "#fcd34d",
                    
          "error": "#ff0000",
          },
        },
      ],
    },
  theme: {
    extend: {}
  },

  plugins: [typography, forms, containerQueries, daisyui]
} satisfies Config;
