import plugin from 'tailwindcss/plugin'
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'

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
         boxShadow: {
				input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`
			},
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
      require("@tailwindcss/typography"),
      typography,
      forms,
      require('daisyui'),
      addVariablesForColors,
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

function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme('colors'));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		':root': newVars
	});
}

module.exports = config
