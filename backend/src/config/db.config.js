require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DefaultAzureCredential } = require('@azure/identity');

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
    return sequelize;
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    throw err;  // Re-throw error to handle it properly
  }
}

// Export the promise of the sequelize instance
module.exports = createSequelizeInstance();
