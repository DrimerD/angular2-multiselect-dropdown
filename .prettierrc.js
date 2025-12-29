module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'consistent',
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  overrides: [
    {
      files: 'src/**/*.html',
      options: {
        printWidth: 140,
      },
    },
    {
      files: '*.html',
      options: {
        parser: 'angular',
      },
    },
  ],
};
