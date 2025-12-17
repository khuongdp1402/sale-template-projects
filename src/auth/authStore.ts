import { User, Session, LoginCredentials, RegisterData, AuthError } from './authTypes';

const STORAGE_KEYS = {
    USERS: 'kwx_users',
    SESSION: 'kwx_session',
} as const;

// Helper functions
const generateId = (): string => {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const generateToken = (): string => {
    return `kwx_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
};

const getExpirationDate = (days: number = 7): string => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString();
};

// Storage functions
const getUsers = (): User[] => {
    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
    return usersJson ? JSON.parse(usersJson) : [];
};

const saveUsers = (users: User[]): void => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

const getSession = (): Session | null => {
    const sessionJson = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!sessionJson) return null;

    const session: Session = JSON.parse(sessionJson);

    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
        return null;
    }

    return session;
};

const saveSession = (session: Session): void => {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
};

const clearSession = (): void => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
};

// Validation functions
const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password: string): AuthError | null => {
    if (password.length < 8) {
        return { field: 'password', message: 'Mật khẩu phải có ít nhất 8 ký tự' };
    }
    return null;
};

const validateUsername = (username: string): AuthError | null => {
    if (username.length < 3) {
        return { field: 'username', message: 'Tên người dùng phải có ít nhất 3 ký tự' };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return { field: 'username', message: 'Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới' };
    }
    return null;
};

// Auth functions
export const loginWithPassword = (credentials: LoginCredentials): { success: boolean; session?: Session; error?: AuthError } => {
    const users = getUsers();
    const { usernameOrEmail, password } = credentials;

    const user = users.find(
        u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
    );

    if (!user) {
        return {
            success: false,
            error: { message: 'Tên đăng nhập hoặc mật khẩu không đúng' }
        };
    }

    const { password: _, ...userWithoutPassword } = user;
    const session: Session = {
        user: userWithoutPassword,
        token: generateToken(),
        expiresAt: getExpirationDate()
    };

    saveSession(session);

    return { success: true, session };
};

export const loginWithGoogleMock = (): { success: boolean; session?: Session } => {
    // Simulate Google OAuth success
    const mockGoogleUser: User = {
        id: generateId(),
        username: `google_user_${Date.now()}`,
        email: `user${Date.now()}@gmail.com`,
        createdAt: new Date().toISOString(),
        password: '' // No password for OAuth users
    };

    // Check if user exists, otherwise create
    const users = getUsers();
    const existingUser = users.find(u => u.email === mockGoogleUser.email);

    const user = existingUser || mockGoogleUser;

    if (!existingUser) {
        users.push(mockGoogleUser);
        saveUsers(users);
    }

    const { password: _, ...userWithoutPassword } = user;
    const session: Session = {
        user: userWithoutPassword,
        token: generateToken(),
        expiresAt: getExpirationDate()
    };

    saveSession(session);

    return { success: true, session };
};

export const register = (data: RegisterData): { success: boolean; session?: Session; errors?: AuthError[] } => {
    const errors: AuthError[] = [];

    // Validate username
    const usernameError = validateUsername(data.username);
    if (usernameError) errors.push(usernameError);

    // Validate email
    if (!validateEmail(data.email)) {
        errors.push({ field: 'email', message: 'Email không hợp lệ' });
    }

    // Validate password
    const passwordError = validatePassword(data.password);
    if (passwordError) errors.push(passwordError);

    // Validate confirm password
    if (data.password !== data.confirmPassword) {
        errors.push({ field: 'confirmPassword', message: 'Mật khẩu xác nhận không khớp' });
    }

    // Check uniqueness
    const users = getUsers();

    if (users.some(u => u.username === data.username)) {
        errors.push({ field: 'username', message: 'Tên người dùng đã tồn tại' });
    }

    if (users.some(u => u.email === data.email)) {
        errors.push({ field: 'email', message: 'Email đã được sử dụng' });
    }

    if (errors.length > 0) {
        return { success: false, errors };
    }

    // Create new user
    const newUser: User = {
        id: generateId(),
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    // Auto-login
    const { password: _, ...userWithoutPassword } = newUser;
    const session: Session = {
        user: userWithoutPassword,
        token: generateToken(),
        expiresAt: getExpirationDate()
    };

    saveSession(session);

    return { success: true, session };
};

export const logout = (): void => {
    clearSession();
};

export const getCurrentSession = (): Session | null => {
    return getSession();
};

export const isAuthenticated = (): boolean => {
    return getSession() !== null;
};

export const updateUserProfile = (updates: Partial<Omit<User, 'id' | 'password' | 'createdAt'>>): { success: boolean; error?: AuthError } => {
    const session = getSession();
    if (!session) {
        return { success: false, error: { message: 'Không tìm thấy phiên đăng nhập' } };
    }

    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === session.user.id);

    if (userIndex === -1) {
        return { success: false, error: { message: 'Không tìm thấy người dùng' } };
    }

    // Check email uniqueness if changing
    if (updates.email && updates.email !== users[userIndex].email) {
        if (users.some(u => u.email === updates.email && u.id !== session.user.id)) {
            return { success: false, error: { field: 'email', message: 'Email đã được sử dụng' } };
        }
    }

    // Check username uniqueness if changing
    if (updates.username && updates.username !== users[userIndex].username) {
        if (users.some(u => u.username === updates.username && u.id !== session.user.id)) {
            return { success: false, error: { field: 'username', message: 'Tên người dùng đã tồn tại' } };
        }
    }

    // Update user
    users[userIndex] = { ...users[userIndex], ...updates };
    saveUsers(users);

    // Update session
    const { password: _, ...userWithoutPassword } = users[userIndex];
    session.user = userWithoutPassword;
    saveSession(session);

    return { success: true };
};

export const changePassword = (currentPassword: string, newPassword: string): { success: boolean; error?: AuthError } => {
    const session = getSession();
    if (!session) {
        return { success: false, error: { message: 'Không tìm thấy phiên đăng nhập' } };
    }

    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === session.user.id);

    if (userIndex === -1) {
        return { success: false, error: { message: 'Không tìm thấy người dùng' } };
    }

    // Verify current password
    if (users[userIndex].password !== currentPassword) {
        return { success: false, error: { field: 'currentPassword', message: 'Mật khẩu hiện tại không đúng' } };
    }

    // Validate new password
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
        return { success: false, error: passwordError };
    }

    // Update password
    users[userIndex].password = newPassword;
    saveUsers(users);

    return { success: true };
};
