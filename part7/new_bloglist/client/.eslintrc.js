module.exports = {
    'env': {
        'commonjs': true,
        'es6': true,
        'node': true,
        "browser": true,
        "jasmine": true,
        "jest": true
    },
    'settings': {
        'react': {
            "version": "detect"
        }
    },
    'extends': ['eslint:recommended', 'plugin:react/recommended'],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        "ecmaFeatures": {
            "jsx": true
        },
        'ecmaVersion': 2018,
        "sourceType": "module"
    },
    'rules': {
        'indent': [
            'error',
            2
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-console": 0,
        "no-useless-catch": 0,
        "react/prop-types": 0
    }
}