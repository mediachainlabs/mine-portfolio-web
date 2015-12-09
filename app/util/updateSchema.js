import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-fetch';
import env from 'require-env';

const targetPath = path.join(__dirname, '..', '..', 'tmp');
const API_ORIGIN = env.require('API_ORIGIN');

if (!fs.existsSync(targetPath)) {
  fs.mkdirSync(targetPath);
}

fetch(`${API_ORIGIN}/schema`)
  .then((r) => r.json())
  .then((json) => {
    fs.writeFileSync(
      path.join(targetPath, 'schema.json'),
      JSON.stringify(json, null, 2)
    );
  }).catch((e) => {
    console.error('Schema updated failed', e);
    process.exit(1);
  });

