import { API_URL } from '../utils/config';

export const getUserRole = async () => {
    const response = await fetch(`${API_URL}/user-role`, {
        credentials: 'include', // Include credentials (cookies) for cross-origin requests
    });
    const data = await response.json();
    return data.role;
};
