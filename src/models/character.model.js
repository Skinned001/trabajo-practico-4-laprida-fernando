import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Character = sequelize.define('Character', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,     
    primaryKey: true,        
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,      
    unique: true,           
  },
  ki: {
    type: DataTypes.INTEGER,
    allowNull: false,       
  },
  race: {
    type: DataTypes.STRING,
    allowNull: false,        
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female'),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,        
  },
}, {
  tableName: 'characters',    // Nombre de la tabla en la base de datos
});
