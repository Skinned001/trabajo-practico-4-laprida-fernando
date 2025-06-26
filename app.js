import express from 'express';
import dotenv from 'dotenv';
import characterRoutes from './src/routes/character.routes.js';
import { sequelize } from './src/config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/characters', characterRoutes); 

sequelize.authenticate()
  .then(async () => {
    console.log('🟢 Conectado a la base de datos MySQL');
    await sequelize.sync();
    console.log('📦 Modelos sincronizados');
    app.listen(PORT, () => {// Levantar servidor
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('🔴 Error al conectar a la base de datos:', error);
  });
