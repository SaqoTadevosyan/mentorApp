module.exports = {
  env: {
    "jest/globals": true,
  },
  root: true,
  extends: ["@react-native-community", "plugin:import/typescript"],
  plugins: ["jest", "import"],
  rules: {
    quotes: [2, "double", { avoidEscape: true }],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "react/require-default-props": ["off"],
    "react/no-unstable-nested-components": ["off"],
    "react-native/no-inline-styles": 0,
    "react-hooks/exhaustive-deps": ["off"],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "react-native",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "react-native"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    "import/resolver": {
      "babel-module": {},
    },
  },
};
