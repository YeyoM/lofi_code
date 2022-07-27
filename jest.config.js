module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    "^.+\\.svg$": "<rootDir>/svgTransform.js" 
  },
}