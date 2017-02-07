module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "jest": true,
  },
  "extends": ["eslint-config-airbnb", "eslint:recommended"],
  "parserOptions": {
    "sourceType": "module",
  },
  "rules": {
    "comma-dangle": [
      "error",
      "always-multiline",
    ],
    "react/jsx-filename-extension": [
      1, { "extensions": [".js", ".jsx"] }
    ],
    "react/react-in-jsx-scope": [
      0
    ],
    "indent": [
      "error",
      2,
    ],
    "linebreak-style": [
      "error",
      "unix",
    ],
    "quotes": [
      "error",
      "single",
    ],
    "semi": [
      "error",
      "always",
    ],
    "no-unused-vars": [
      "warn",
    ],
    "no-console": 0,
  },
};
