import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        background: '#efefef',
        moonstone: '#47A8BD',
        celdon: '#93E5AB',
      },
    },
  },
  daisyui: {
    themes: ["light"]
  },
  plugins: [require('daisyui')],
};

export default config;
