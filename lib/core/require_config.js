require.config({
    paths: {
        'react': '../lib/core/react',
        'react-dom': '../lib/core/react-dom',
        'babel': '../lib/core/requre-js/babel-5.8.34.min',
        'jsx': '../lib/core/requre-js/jsx',
        'text': '../lib/core/requre-js/text',
    },

    shim : {
        "react": {
          "exports": "React"
        }
    },

    config: {
        babel: {
          sourceMaps: "inline", // One of [false, 'inline', 'both']. See https://babeljs.io/docs/usage/options/
          fileExtension: ".jsx" // Can be set to anything, like .es6 or .js. Defaults to .jsx
        }
    }
});
