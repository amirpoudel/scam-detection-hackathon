export const COOKIE_OPTIONS = {
    
    path: '/',
    httpOnly: true,
    secure: false, // Change this to false for local development
    sameSite: 'none'as 'none' | 'lax' | 'strict' | undefined,
};

