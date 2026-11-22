import nextVitals from 'eslint-config-next/core-web-vitals';

// Next.js 16 removed `next lint`; ESLint runs directly (npm run lint).
const config = [
  ...nextVitals,
  {
    rules: {
      // The logo SVG and a few decorative images are intentionally plain <img>
      // (tiny vector files that next/image would not optimise).
      '@next/next/no-img-element': 'off'
    }
  },
  { ignores: ['.next/**', 'node_modules/**', 'public/**'] }
];

export default config;
