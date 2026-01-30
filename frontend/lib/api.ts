const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

export async function apiFetch(
    path: string,
    options: RequestInit = {}
) {
    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('token')
            : null;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.json();
}
