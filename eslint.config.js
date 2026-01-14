import graphqlPlugin from '@graphql-eslint/eslint-plugin';

export default [
  {
    // 1. Common configuration for all GraphQL files
    files: ['**/*.{graphql,gql}'],
    languageOptions: {
      parser: graphqlPlugin.parser,
    },
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
  },
  {
    // 2. Rules specifically for your SCHEMA file
    files: ['schema.graphql'],
    rules: {
      ...graphqlPlugin.configs['flat/schema-recommended'].rules,
      '@graphql-eslint/naming-convention': 'error',
    },
  },
  {
    // 3. Rules specifically for your QUERY/OPERATION files
    files: ['src/**/*.gql', 'person.gql'], 
    rules: {
      ...graphqlPlugin.configs['flat/operations-recommended'].rules,
      '@graphql-eslint/naming-convention': 'error',
    },
  }
];
