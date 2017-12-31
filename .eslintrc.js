module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "env": {
      "browser": true
  },
  "plugins": [
      "react",
      "prettier"
  ],
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "globals": { //define the globals here
     "__DEV__": true,
     "require": true,
     "module": true,
     "Promise": true
 },
  "rules": {
    //general
    "no-console": 0,
    "comma-dangle": ["error", "never"],

    //react plugin
    "react/no-string-refs": 0,

    //style
    "no-multi-spaces": 1,
    "array-bracket-spacing": ["error", "never"],
    "indent": ["error", 4],
    "max-len": ["error", 180],
    "no-trailing-spaces": 1,
    "semi": ["error", "always"],

    //variables
    "no-undef": 1,
    "no-unused-vars": 2,
    "no-shadow": 1,
  }
};
