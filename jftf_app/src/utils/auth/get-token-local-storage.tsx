export function getTokenFromLocalStorage(): string | null {
    try {
        const token = localStorage.getItem('token');
        return token !== null && token !== '' ? token : null;
    } catch (error) {
        console.error('Error retrieving token from local storage:', error);
        return null;
    }
}
