module.exports = {
    extends: 'standard',
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        // https://www.npmjs.com/package/babel-eslint#configuration
        allowImportExportEverywhere: false,
        codeFrame: false
    },
    env: {
        browser: true,
        es6: true
    },
    rules: {
        strict: 0
    },
    // 定义全局变量
    // http://eslint.cn/docs/user-guide/configuring#specifying-globals
    globals: {
        $: false
    }
};
