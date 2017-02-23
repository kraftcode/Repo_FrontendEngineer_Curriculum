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
    "import/extensions": [
      0
    ],
    "react/jsx-filename-extension": [
      1, { "extensions": [".js", ".jsx"] }
    ],
    "react/react-in-jsx-scope": [
      0
    ],
    "react/prop-types": [ 0 ],
    "indent": [
      "error",
      2,
    ],
    "linebreak-style": [
      "error",
      "unix",
    ],
    "semi": [
      "error",
      "always",
    ],
    "no-unused-vars": [
      0
    ],
    "no-console": 0,
  },
};
