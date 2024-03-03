import plugin from 'tailwindcss/plugin'
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config}*/
const config = {
   content: ["./src/**/*.{html,js,svelte,ts}"],
   themes: ["light", "dark"],
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
