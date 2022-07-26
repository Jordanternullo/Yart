const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'libs/**/**/src/**/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'Helvetica', 'sans-serif'],
        icons: ['remixicon']
      },
      colors: {
        primary: {
         "100": "#ede6ff",
         "200": "#c5b7ff",
         "300": "#9e88f9",
         "400": "#7758f4",
         "500": "#5129f0"
        },
        secondary: {
         "100": "#f3fdfd",
         "200": "#e7fbfb",
         "300": "#daf9f9",
         "400": "#ccf7f7",
         "500": "#bef6f6"
        },
        dark: {
         "100": "#56648d",
         "200": "#434e6c",
         "300": "#30374d",
         "400": "#1d212e",
         "500": "#090b11"
        },
        light: {
         "100": "#cad0e1",
         "200": "#b5bed6",
         "300": "#9eaacb",
         "400": "#8d98b5",
         "500": "#7a839d"
        },
        error: {
         "100": "#f9e5e4",
         "200": "#f3c9c7",
         "300": "#eea7a4",
         "400": "#e87d77",
         "500": "#e23b28"
        },
        warning: {
         "100": "#fff1e5",
         "200": "#ffe3c8",
         "300": "#ffd4a7",
         "400": "#ffc47d",
         "500": "#ffb33a"
        },
        success: {
         "100": "#ebf6e4",
         "200": "#d6eec5",
         "300": "#bfe5a1",
         "400": "#a5dc73",
         "500": "#86d313"
        },
       },
    },
  },
  variants: {
    extend: {},
  },
  safelist: [
    {
      pattern: /(bg|border|text|fill)-(violet|red|brand|error|success|bg-element-light-lighter-500|accent)(-\w+\d+)*/,
      variants: ['focus', 'hover'],
    },
    {
      pattern: /(w|h)-(\w+\d+)*/,
    },
  ],
  plugins: [],
};
