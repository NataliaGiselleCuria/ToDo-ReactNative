import { User } from "../types/types";
import user1 from '../assets/avatars/superwoman.png';
import user2 from '../assets/avatars/arlequin.png';
import user3 from '../assets/avatars/captain.png';
import user4 from '../assets/avatars/jason.png';

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
    avatar: user2,
  },
  {
    id: 3,
    username: "mariela_85",
    name: "Mariela Fernández",
    email: "mariela@example.com",
    password: "hashedpass",
    avatar: user3,
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
    avatar: user4,
  },
  {
    id: 5,
    username: "sofia_code",
    name: "Sofía González",
    email: "sofia@example.com",
    password: "hashedpass",
  },
  {
    id: 6,
    username: "lucas_dev",
    name: "Lucas Martínez",
    email: "lucas@example.com",
    password: "hashedpass",
  },
  {
    id: 7,
    username: "ana_uiux",
    name: "Ana Fernández",
    email: "ana@example.com",
    password: "hashedpass",
  },
  {
    id: 8,
    username: "martin_js",
    name: "Martín Herrera",
    email: "martin@example.com",
    password: "hashedpass",
  },
  {
    id: 9,
    username: "carla_db",
    name: "Carla Domínguez",
    email: "carla@example.com",
    password: "hashedpass",
  },
  {
    id: 10,
    username: "diego_stack",
    name: "Diego Ramírez",
    email: "diego@example.com",
    password: "hashedpass",
  },
  {
    id: 11,
    username: "valentina_web",
    name: "Valentina Ruiz",
    email: "valentina@example.com",
    password: "hashedpass",
  },
  {
    id: 12,
    username: "diego_stack",
    name: "Diego Ramírez",
    email: "diego@example.com",
    password: "hashedpass",
  },
  {
    id: 13,
    username: "valentina_web",
    name: "Valentina Ruiz",
    email: "valentina@example.com",
    password: "hashedpass",
  },
];