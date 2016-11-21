module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    extends: 'airbnb-base',
    plugins: [
        'html'
    ],
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': 'build/webpack.base.conf.js'
            }
        }
    },
    'rules': {
        'import/extensions': ['error', 'always', {
            'js': 'never',
            'vue': 'never'
        }],
        'comma-dangle': ['error', 'never'],
        'semi': ['error', 'never'],
        'indent': ['error', 4],
        'class-methods-use-this': ['off'],
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
