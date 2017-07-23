module.exports = {
    extends: 'standard',
    parser: 'babel-eslint',
    parserOptions: {
        // https://www.npmjs.com/package/babel-eslint#configuration
        sourceType: 'module',
        codeFrame: false
    },
    env: {
        browser: true,
        commonjs: true
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
