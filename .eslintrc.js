module.exports = {
    extends: [
        'eslint-config-rchl-vue',
        'eslint-config-rchl-typescript',
    ],
    overrides: [
        {
            files: ['*.ts'],
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
            },
            rules: {
                '@typescript-eslint/semi': 'off',
            },
        },
        {
            files: ['*.vue'],
            parserOptions: {
                parser: '@typescript-eslint/parser',
            },
        },
    ],
    rules: {
        semi: 'off',
    },
};
