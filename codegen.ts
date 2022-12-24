const config = {
  schema: 'http://localhost:80/graphql',
  documents: ['src/**/!(*.generated).{ts,tsx}'],
  generates: {
    'src/types.ts': ['typescript'],
    'src/': {
      preset: 'near-operation-file',
      presetConfig: { extension: '.generated.tsx', baseTypesPath: 'types.ts' },
      plugins: ['typescript-operations', 'typescript-urql'],
      config: { withHooks: true },
    },
  },
};
export default config;
