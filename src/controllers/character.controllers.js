import { Character } from '../models/character.model.js';

// ✅ Validación de datos antes de crear o editar un personaje
const validateCharacterData = async (data, isEdit = false, currentId = null) => {
  const { name, ki, race, gender, description } = data;

  // Campos obligatorios
  if (!name || !ki || !race || !gender) {
    return { status: 400, message: 'Los campos name, ki, race y gender son obligatorios.' };
  }

  // ki debe ser un numero entero 
  if (!Number.isInteger(ki)) {
    return { status: 400, message: 'El campo ki debe ser un número entero.' };
  }

  // gender solo puede ser "Male" o "Female"
  if (!['Male', 'Female'].includes(gender)) {
    return { status: 400, message: 'El campo gender solo puede ser "Male" o "Female".' };
  }

  // description (opcional) debe ser string
  if (description && typeof description !== 'string') {
    return { status: 400, message: 'El campo description debe ser una cadena de texto.' };
  }

  // Verificar que el nombre no esté repetido (solamente cuando se)
  const existing = await Character.findOne({ where: { name } });
  if (existing && (!isEdit || existing.id !== currentId)) {
    return { status: 400, message: 'Ya existe un personaje con ese nombre.' };
  }

  return null; // todo OK
};

//Controladores 

export const getAllCharacters = async (req, res) => {
  const characters = await Character.findAll();
  res.json(characters);
};

export const getCharacterById = async (req, res) => {
  const { id } = req.params;
  const character = await Character.findByPk(id);

  if (!character) {
    return res.status(404).json({ message: 'Personaje no encontrado.' });
  }

  res.json(character);
};


export const createCharacter = async (req, res) => {
  const error = await validateCharacterData(req.body);
  if (error) return res.status(error.status).json({ message: error.message });

  const character = await Character.create(req.body);
  res.status(201).json(character);
};


