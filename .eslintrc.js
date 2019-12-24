module.exports = {
    "env": {
        "amd": true,
        "mocha": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2015
    },
    "rules": {
        "no-prototype-builtins": 0
    }
};