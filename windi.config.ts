import { defineConfig } from '@windicss/plugin-utils';

export default defineConfig({
  /**
   * Write windi classes in html attributes.
   * @see https://windicss.org/features/attributify.html
   */
  attributify: true,

  theme: {
    extend: {
      colors: {
        'redMy-50': '#f6f5f5',
        'redMy-300': '#d48989',
        'redMy-400': '#e83b04',
        redMy500: '#e40d04',
        'redMy-800': '#260303',
        'redMy-900': '#1f0404',

        greenMy: '#61e404',
        yellowMy: '#ffd900',
        pinkMy: '#e07b7c',
        orangeMy: '#e98b05',

        greyMy: '#ae999f',
        brownMy: '#82603f',
        blackMy: '#1f0404',
      },

      dropShadow: {
        'shadow-my': '8px 8px 10px 4px rgba(212, 137, 137, 0.1)',
        flag: '5px 5px 15px rgba(255, 255, 255, 0.25)',
      },
    },
  },
});

// $redMy-50: #f6f5f5,
// $redMy-300: #d48989,
// $redMy-400: #e83b04,
// $redMy-500: #e40d04,
// $redMy-800: #260303,
// $redMy-900: #1f0404,

// $greenMy: #61e404,
// $yellowMy: #ffd900,
// $pinkMy: #e07b7c,
// $orangeMy: #e98b05,

// $greyMy: #ae999f,
// $brownMy: #82603f,
// $blackMy: #1f0404,

// $gradientMy: linear-gradient(
//   270.4deg,
//   #3c1919 12.17%,
//   #3b1111 64.61%,
//   #1f0404 95.29%
// ),

// $shadowMy: 8px 8px 10px 4px rgba(212, 137, 137, 0.1),
