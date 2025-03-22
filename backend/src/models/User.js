const { DataTypes } = require('sequelize');
const sequelizePromise = require('../config/db.config');  // Import the promise

async function defineUserModel() {
  const sequelize = await sequelizePromise;  // Await the resolved sequelize instance

  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, Infinity],
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: [/^\+?[0-9]\d{1,14}$/],
          msg: `phone number is not a valid phone number!`
        }
      }
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    resetPasswordToken: {
      type: DataTypes.STRING
    },
    resetPasswordExpires: {
      type: DataTypes.DATE
    },
    passwordChangedAt: {
      type: DataTypes.DATE
    },
    loginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    accountLocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lockUntil: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: true,
    tableName: 'users',
  });

  return User;
}

module.exports = defineUserModel();
