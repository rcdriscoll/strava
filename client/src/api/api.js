export async function getStats() {
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const response = await fetch(`${VITE_API_BASE_URL}/strava-stats`);

    if (!response.ok) {
        throw new Error('Error getting stats');
    }
    return response.json();
}

export async function setToken(code) {
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    
    const response = await fetch(`${VITE_API_BASE_URL}/exchange_token?code=${code}`);

    if (!response.ok) {
        throw new Error('Error setting token');
    }
    return;
}

export async function checkToken() {
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    
    const response = await fetch(`${VITE_API_BASE_URL}/token-status`);

    if (!response.ok) {
        throw new Error('Error checking token');
    }
    return response.json();
}