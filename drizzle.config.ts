import { defineConfig } from 'drizzle-kit';
import { readConfig } from './src/configs/app';

export default defineConfig({
  schema: 'src/db/schema.ts',
  out: 'src/db/generated',
  dialect: 'postgresql',
  dbCredentials: {
    url: readConfig().dbUrl,
  },
});
