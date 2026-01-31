export type PasswordCheck = {
    valid: boolean;
    checks: {
        length: boolean;
        upper: boolean;
        lower: boolean;
        number: boolean;
        symbol: boolean;
    };
};

export function checkPassword(password: string): PasswordCheck {
    const checks = {
        length: password.length >= 12,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[^A-Za-z0-9]/.test(password),
    };

    return {
        valid: Object.values(checks).every(Boolean),
        checks
    };
}

export function passwordStrength(password: string): number {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0–5
}
