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
  
  const doctor = await datasource.query('SELECT id FROM doctors WHERE name ILIKE \'%Michael%\' LIMIT 1');
  const user = await datasource.query('SELECT id FROM users WHERE email ILIKE \'%newopaient%\' OR role = \'patient\' LIMIT 1');
  const hospital = await datasource.query('SELECT id FROM hospitals LIMIT 1');

  if (!doctor.length || !user.length || !hospital.length) {
    console.error('Prerequisites missing');
    return;
  }

  // Insert the appointment that Virat and Michael booked
  const res = await datasource.query(`
    INSERT INTO appointments (
      id, "patientId", "doctorId", "hospitalId", "appointmentDate", 
      "tokenNumber", status, "expectedStartTime", "expectedEndTime", 
      "patient_name", reason, "createdAt"
    ) VALUES (
      gen_random_uuid(), '${user[0].id}', '${doctor[0].id}', '${hospital[0].id}', '2026-04-05',
      6, 'BOOKED', '10:30', '10:45',
      'Virat', 'headache', now()
    ) RETURNING id
  `);

  console.log('Successfully inserted Virat\'s appointment:', res[0].id);
  await datasource.destroy();
}

run();
