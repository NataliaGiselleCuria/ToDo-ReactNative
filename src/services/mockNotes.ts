import { Item, ItemState, Note } from "../types/types";
import {userContacts, loggedUser} from "./mockUsers";


export const mockNotes: Note[] = [
  {
    id: 1,
    user: loggedUser,
    content: [{ type: "text", value: "¡Hola Juan! ¿Cómo va todo?" }],
    date: new Date("2025-05-20T10:00:00"),
  },
  {
    id: 2,
    user: userContacts[0], // Juan Pérez
    content: [{ type: "text", value: "¡Hola Natalia! Bien, por suerte." }],
    date: new Date("2025-05-20T10:01:00"),
  },
  {
    id: 3,
    user: userContacts[0],
    content: [{ type: "text", value: "¿Terminaste el diseño del formulario?" }],
    date: new Date("2025-05-20T10:02:00"),
  },
  {
    id: 4,
    user: loggedUser,
    content: [{ type: "text", value: "¡Sí! Lo dejé subido al repo." }],
    date: new Date("2025-05-20T10:03:00"),
  },
  {
    id: 5,
    user: loggedUser,
    content: [
      { type: "text", value: "Después revisalo cuando puedas." },
      { type: "image", value: "https://images.ctfassets.net/ihx0a8chifpc/JVN7uKOhy2mCHDoTg64ZR/faad2473a2d27e7be45393c5a1592a1a/assets.so-game-1280x720.png?w=1280&q=60&fm=webp" },
    ],
    date: new Date("2025-05-20T10:04:00"),
  },
  {
    id: 6,
    user: userContacts[1], // Mariela
    content: [{ type: "text", value: "¡Chiques! Quedó genial lo que hicieron 👏" }],
    date: new Date("2025-05-20T10:06:00"),
  },
  {
    id: 7,
    user: loggedUser,
    content: [{ type: "text", value: "¡Gracias Mari!" }],
    date: new Date("2025-05-20T10:07:00"),
  },
  {
    id: 8,
    user: loggedUser,
    content: [
        { type: "text", value: "Esto me respondieron." },
      { type: "audio", value: "https://example.com/audio.mp3" }],
    date: new Date("2025-05-20T10:07:30"),
  },
  {
    id: 9,
    user: userContacts[1],
    content: [{ type: "text", value: "Cuando quieran lo subimos al cliente." }],
    date: new Date("2025-05-20T10:08:00"),
  },
];

export const mockItem: Item = {
  idList: 1,
  id: 123,
  name: "Chat de Proyecto",
  createdBy: loggedUser,
  scheduleStartDate: false,
  scheduleStartTime: false,
  startDate: new Date(),
  scheduleEndDate: false,
  scheduleEndTime: false,
  state: 'En proceso' as ItemState, 
  record: [],
  note: mockNotes,
};