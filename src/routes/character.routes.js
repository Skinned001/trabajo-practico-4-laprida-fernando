// src/routes/character.routes.js
import { Router } from 'express';
import {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter
} from '../controllers/character.controllers.js';

const router = Router();

// GET /api/characters - Obtener todos los personajes
router.get('/', getAllCharacters);

// GET /api/characters/:id - Obtener un personaje por ID
router.get('/:id', getCharacterById);

// POST /api/characters - Crear un nuevo personaje
router.post('/', createCharacter);

// PUT /api/characters/:id - Actualizar un personaje existente
router.put('/:id', updateCharacter);

// DELETE /api/characters/:id - Eliminar un personaje
router.delete('/:id', deleteCharacter);

export default router;
