import { getToken, clearToken, isTokenExpired } from './token';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function apiFetch(
    path: string,
    options: RequestInit = {}
) {
    const token = getToken();

    if (token && isTokenExpired(token)) {
        clearToken();
        window.location.href = '/auth/login';
        throw new Error('Session expired');
    }

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers
    });

    if (res.status === 401) {
        clearToken();
        window.location.href = '/login';
        throw new Error('Unauthorized');
    }

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.json();
}
