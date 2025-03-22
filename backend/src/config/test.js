require('dotenv').config();
const connectToDatabase = require('./db.config');


async function testDB() {
  try {
    //const pool = await connectToDatabase();

    if (pool) {
      //const result = await pool.request().query("SELECT TOP 1 * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users'");

      
      if (result.recordset.length > 0) {
        /*const insertResult = await pool.request().query(`INSERT INTO users (email, password, first_name, last_name, phone, verified)
            VALUES
            ('neo@gmail.com', 'neo123', 'Neo', 'Masilo', '+27274648268', 0);
          `);*/
        const users = await pool.request().query("SELECT TOP 5 * FROM users");
        console.log(users.recordset);
      }
    }
  } catch (err) {
    console.error('DB Test Error:', err);
  }
}

testDB();
