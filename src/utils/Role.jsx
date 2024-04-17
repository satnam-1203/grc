export const getUserRole = async () => {
    const response = await fetch('http://localhost:3001/user-role', {
        credentials: 'include', // Include credentials (cookies) for cross-origin requests
    });
    const data = await response.json();
    return data.role;
};