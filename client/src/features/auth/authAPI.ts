import axios from 'axios';

const API_URL = 'http://your-api-url';

export const signup = async (username: string, email: string, password: string): Promise<string> => {
  const response = await axios.post(`${API_URL}/signup`, { username, email, password });
  return response.data.token;
};

export const signin = async (email: string, password: string): Promise<string> => {
  const response = await axios.post(`${API_URL}/signin`, { email, password });
  return response.data.token;
};

export const logout = async (): Promise<void> => {
  await axios.get(`${API_URL}/logout`);
};
