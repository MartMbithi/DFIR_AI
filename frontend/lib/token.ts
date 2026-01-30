export function getToken(): string | null {
    return localStorage.getItem('token');
}

export function clearToken() {
    localStorage.removeItem('token');
}

export function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(
            atob(token.split('.')[1])
        );
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;
    }
}
