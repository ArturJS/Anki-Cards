module.exports = {
  collectCoverageFrom: [
    '{local_modules,src,server}/**/*.{js}',
    '!{local_modules,src,server}/**/*.test.{js}',
    '!{local_modules,src,server}/**/*index.{js}'
  ],
  setupFiles: ['<rootDir>/scripts/tools/jest/__mocks__/browser-mocks.js'],
  testURL: 'http://localhost:8080',
  transform: {
    '\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.scss$': './scripts/tools/jest/css-transform.js'
  },
  testRegex: '(/__tests__/.*|\\.(test))\\.(js)$',
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js)$'],
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/scripts/tools/jest/assets-transform.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  verbose: true
};
