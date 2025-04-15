import { User } from "../types/types";
import user1 from '../assets/avatars/superwoman.png'

// Usuario logueado
export const loggedUser: User = {
  id: 1,
  username: "natalia_dev",
  name: "Natalia G.",
  email: "natalia@example.com",
  password: "securepassword123",
  avatar: user1,
};

// Contactos del usuario logueado (usuarios con los que ya tiene relación)
export const userContacts: User[] = [
  {
    id: 2,
    username: "juancho",
    name: "Juan Pérez",
    email: "juan@example.com",
    password: "hashedpass",

  },
  {
    id: 3,
    username: "mariela_85",
    name: "Mariela Fernández",
    email: "mariela@example.com",
    password: "hashedpass",
  },
];

// Otros usuarios en la plataforma (que no están en contactos)
export const otherUsers: User[] = [
  {
    id: 4,
    username: "pedro_gamer",
    name: "Pedro López",
    email: "pedro@example.com",
    password: "hashedpass",
  },
  {
    id: 5,
    username: "sofia_code",
    name: "Sofía González",
    email: "sofia@example.com",
    password: "hashedpass",
  },
];