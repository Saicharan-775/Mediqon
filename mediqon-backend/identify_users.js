const { DataSource } = require('typeorm');
require('dotenv').config();

const datasource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function run() {
  await datasource.initialize();
  const users = await datasource.query('SELECT id, email, role, "fullName" FROM users WHERE "fullName" ILIKE \'%Saicharan%\' OR email ILIKE \'%saicharan%\' OR email ILIKE \'%newopaient%\' LIMIT 10');
  console.log(JSON.stringify(users, null, 2));
  await datasource.destroy();
}

run();
