export interface PurchasedTemplate {
    id: string;
    templateId: string;
    templateName: string;
    planName: string;
    purchasedAt: string;
    status: 'Active' | 'Revoked' | 'Expired';
    price: number;
    currency: string;
    licenseKey: string;
    expiresAt?: string;
    isActive: boolean;
}

export interface PurchasedService {
    id: string;
    serviceName: string;
    category: string;
    purchasedAt: string;
    status: 'Active' | 'Inactive';
    price: number;
    currency: string;
    accessKey: string;
    notes: string;
}

// Helper to generate random keys
export const generateKey = (prefix = 'KWX', segments = 4): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const parts = [];
    for (let i = 0; i < segments; i++) {
        let segment = '';
        for (let j = 0; j < 4; j++) {
            segment += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        parts.push(segment);
    }
    return `${prefix}-${parts.join('-')}`;
};

// Initial seed data
export const initialTemplates: PurchasedTemplate[] = [
    {
        id: 'ord_t1',
        templateId: 'proxy-hub-service',
        templateName: 'Proxy Hub Service',
        planName: 'Standard License',
        purchasedAt: '2025-01-15T10:30:00Z',
        status: 'Active',
        price: 890000,
        currency: 'VND',
        licenseKey: 'KWX-PRXY-9928-AB34-CD56',
        isActive: true
    },
    {
        id: 'ord_t2',
        templateId: 'gaming-accounts-pro',
        templateName: 'Gaming Accounts Shop',
        planName: 'Developer License',
        purchasedAt: '2025-02-01T14:20:00Z',
        status: 'Active',
        price: 1500000,
        currency: 'VND',
        licenseKey: 'KWX-GAME-7733-XY99-ZZ11',
        isActive: true
    },
    {
        id: 'ord_t3',
        templateId: 'cosmetic-store-lite',
        templateName: 'Cosmetic Store Lite',
        planName: 'Standard License',
        purchasedAt: '2024-12-20T09:15:00Z',
        status: 'Revoked',
        price: 690000,
        currency: 'VND',
        licenseKey: 'KWX-COSM-0000-XXXX-YYYY',
        isActive: false
    }
];

export const initialServices: PurchasedService[] = [
    {
        id: 'srv_1',
        serviceName: 'Payment API Access',
        category: 'API',
        purchasedAt: '2025-01-10T08:00:00Z',
        status: 'Active',
        price: 500000,
        currency: 'VND',
        accessKey: 'sk_live_51M3T4X...',
        notes: 'Limit: 1000 req/day'
    },
    {
        id: 'srv_2',
        serviceName: 'Marketing Growth Pack',
        category: 'Tools',
        purchasedAt: '2025-02-05T11:45:00Z',
        status: 'Active',
        price: 2000000,
        currency: 'VND',
        accessKey: 'KWX-MKT-GROW-2025',
        notes: 'Valid until 2026'
    }
];
