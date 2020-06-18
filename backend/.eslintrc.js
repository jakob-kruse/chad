module.exports = {
    parser: '@typescript-eslint/parser',

    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },

    plugins: ['sort-class-members'],

    extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],

    rules: {
        'sort-class-members/sort-class-members': [
            2,
            {
                order: [
                    '[static-properties]',
                    '[static-methods]',
                    '[properties]',
                    '[conventional-private-properties]',
                    'constructor',
                    '[methods]',
                    '[conventional-private-methods]',
                ],
                accessorPairPositioning: 'getThenSet',
            },
        ],
    },
}
