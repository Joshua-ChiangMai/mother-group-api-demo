import { SqljsConnectionOptions } from 'typeorm/driver/sqljs/SqljsConnectionOptions';
import { entities } from './entities';

export function buildDatabaseOptions(): SqljsConnectionOptions {
  const location = process.env.PROJECT_ALPHA_DB_LOCATION || 'project-alpha.sqlite';
  const autoSave = process.env.PROJECT_ALPHA_DB_AUTOSAVE !== 'false';

  return {
    type: 'sqljs',
    location,
    autoSave,
    synchronize: true,
    entities,
  };
}
