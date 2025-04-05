import axios from "axios";

const API_URL = "http://192.168.0.234:3000";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios", error);
  }
};