import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export const getEnv = () => {
  return process.env.RUNNING_ENV;
};
export default () => {
  const environment = getEnv();
  const yamlPath = join(process.cwd(), `./application.${environment}.yml`);
  return yaml.load(readFileSync(yamlPath,'utf8'))as Record<string, any>;
};