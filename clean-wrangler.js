import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'dist', 'server', 'wrangler.json');
if (fs.existsSync(file)) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  if (data.d1_databases && data.d1_databases.length > 0) {
      delete data.d1_databases[0].migrations_dir;
  }

  const clean = {
    configPath: data.configPath,
    name: data.name,
    main: data.main,
    compatibility_date: data.compatibility_date,
    pages_build_output_dir: data.pages_build_output_dir,
    d1_databases: data.d1_databases,
    rules: data.rules
  };
  fs.writeFileSync(file, JSON.stringify(clean, null, 2));
}
