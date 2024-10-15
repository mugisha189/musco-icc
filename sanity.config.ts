import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { media } from 'sanity-plugin-media';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/cms/schemas';

export default defineConfig({
  basePath: '/studio',
  name: 'rca-icc',
  title: 'RCA interclass competitions CMS',
  projectId: 'lxeru4rg',
  dataset: '2024',
  plugins: [structureTool(), visionTool(), media()],
  schema: {
    types: schemaTypes,
  },
});
