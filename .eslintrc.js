module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["airbnb", "airbnb-typescript"],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  rules: {
    "linebreak-style": 0,
    "import/prefer-default-export": 0,
    "react/require-default-props": 0,
    "no-param-reassign": 0
  }
}