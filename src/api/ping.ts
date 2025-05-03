const API_URL = '/api';

export const ping = async () => {
  const response = await fetch(`${API_URL}/ping`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};