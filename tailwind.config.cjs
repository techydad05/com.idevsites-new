import plugin from 'tailwindcss/plugin'
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config}*/
const config = {
   content: ["./src/**/*.{html,js,svelte,ts}"],
   daisyui: {
      themes: [
         "light",
         "dark",
         "cupcake",
         "bumblebee",
         "emerald",
         "corporate",
         "synthwave",
         "retro",
         "cyberpunk",
         "valentine",
         "halloween",
         "garden",
         "forest",
         "aqua",
         "lofi",
         "pastel",
         "fantasy",
         "wireframe",
         "black",
         "luxury",
         "dracula",
         "cmyk",
         "autumn",
         "business",
         "acid",
         "lemonade",
         "night",
         "coffee",
         "winter",
         "dim",
         "nord",
         "sunset",
      ],
   },
   theme: {
      container: {
         center: true,
         padding: '2rem',
         screens: {
            '2xl': '1440px'
         }
      },
      extend: {
         typography: (theme) => ({
            DEFAULT: {
               css: {
                  code: {
                     position: 'relative',
                     borderRadius: theme('borderRadius.md')
                  }
               }
            }
         })
      }
   },

   plugins: [
      require('daisyui'),
      typography,
      forms,
      plugin(function ({ addVariant, matchUtilities, theme }) {
         addVariant('hocus', ['&:hover', '&:focus']);
         // Square utility
         matchUtilities({
            square: (value) => ({
               width: value,
               height: value,
            }),
         },
            { values: theme('spacing') }
         );
      })
   ]
}

module.exports = config
