require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DefaultAzureCredential } = require('@azure/identity');
const defineUserModel = require('../models/User');

// Function to get Azure token
async function getAccessToken() {
  const credential = new DefaultAzureCredential();
  const tokenResponse = await credential.getToken("https://database.windows.net/.default");
  return tokenResponse.token;
}

// Create Sequelize instance with token
async function createSequelizeInstance() {
  const accessToken = await getAccessToken();

  const sequelize = new Sequelize(process.env.AZURE_SQL_DATABASE, null, null, {
    host: process.env.AZURE_SQL_SERVER,
    dialect: 'mssql',
    dialectOptions: {
      authentication: {
        type: 'azure-active-directory-access-token',
        options: {
          token: accessToken,
        },
      },
      options: {
        encrypt: true,
        trustServerCertificate: false,
      },
    },
    logging: false,  // Optional: Disable logging for cleaner output
  });

  try {
    await sequelize.authenticate();
    console.log("✅ Connected to Azure SQL Database successfully!");

    //test your query here while I try to sort out the test.js
    //const users = await sequelize.query("SELECT * FROM users");
    //console.log("Users:", users);

    const User = defineUserModel(sequelize);
    //await sequelize.sync({ force: true }); // Drops existing table and creates new one
    
    await User.create({
      email: 'sima@example.com',
      password: 'securepassword123',
      firstName: 'Sima',
      lastName: 'Njoli',
      phone: '+1234567892'
    });

    const users = await User.findAll();
    console.log("Users:", users);
    
    return sequelize;
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    throw err;  // Re-throw error to handle it properly
  }
}

// Export the promise of the sequelize instance
module.exports = createSequelizeInstance();
