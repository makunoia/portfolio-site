/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.cssnano = { preset: 'default' };
}

module.exports = config;
