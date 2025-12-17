import React, { useState, useEffect } from 'react';
import { useToast } from '../../components/auth/Toast';
import { KeyField } from '../../components/purchases/KeyField';
import {
    PurchasedTemplate,
    PurchasedService,
    initialTemplates,
    initialServices,
    generateKey
} from '../../data/purchases';

const STORAGE_KEY_PURCHASES = 'kwx_purchases';

export const PurchasesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'templates' | 'services'>('templates');
    const [templates, setTemplates] = useState<PurchasedTemplate[]>([]);
    const [services, setServices] = useState<PurchasedService[]>([]);
    const { showToast } = useToast();

    // Load data from localStorage or initial seed
    useEffect(() => {
        const storedData = localStorage.getItem(STORAGE_KEY_PURCHASES);
        if (storedData) {
            const parsed = JSON.parse(storedData);
            setTemplates(parsed.templates || []);
            setServices(parsed.services || []);
        } else {
            setTemplates(initialTemplates);
            setServices(initialServices);
            // Save initial seed to storage
            localStorage.setItem(STORAGE_KEY_PURCHASES, JSON.stringify({
                templates: initialTemplates,
                services: initialServices
            }));
        }
    }, []);

    const saveToStorage = (newTemplates: PurchasedTemplate[], newServices: PurchasedService[]) => {
        localStorage.setItem(STORAGE_KEY_PURCHASES, JSON.stringify({
            templates: newTemplates,
            services: newServices
        }));
    };

    const handleRevokeKey = (id: string) => {
        if (!confirm('Bạn có chắc chắn muốn hủy license key này? Hành động này không thể hoàn tác.')) return;

        const newTemplates = templates.map(t => {
            if (t.id === id) {
                return { ...t, status: 'Revoked' as const, isActive: false };
            }
            return t;
        });

        setTemplates(newTemplates);
        saveToStorage(newTemplates, services);
        showToast('Đã hủy license key thành công', 'success');
    };

    const handleRegenerateKey = (id: string) => {
        const newTemplates = templates.map(t => {
            if (t.id === id) {
                return { ...t, licenseKey: generateKey() };
            }
            return t;
        });

        setTemplates(newTemplates);
        saveToStorage(newTemplates, services);
        showToast('Đã tạo key mới thành công', 'success');
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Quản lý sản phẩm</h1>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('templates')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'templates'
                                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                            }`}
                    >
                        Templates
                    </button>
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'services'
                                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                            }`}
                    >
                        Dịch vụ
                    </button>
                </div>
            </div>

            {/* Templates List */}
            {activeTab === 'templates' && (
                <div className="space-y-4">
                    {templates.map((template) => (
                        <div key={template.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{template.templateName}</h3>
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${template.status === 'Active'
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                            }`}>
                                            {template.status === 'Active' ? 'Đang hoạt động' : 'Đã hủy'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Gói: {template.planName} • Mua ngày: {formatDate(template.purchasedAt)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(template.price, template.currency)}</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-700/50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <KeyField value={template.licenseKey} label="License Key" />

                                    <div className="flex items-end gap-3">
                                        {template.isActive ? (
                                            <>
                                                <button
                                                    onClick={() => handleRegenerateKey(template.id)}
                                                    className="px-3 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
                                                >
                                                    Tạo key mới
                                                </button>
                                                <button
                                                    onClick={() => handleRevokeKey(template.id)}
                                                    className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                >
                                                    Hủy key
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-sm text-slate-500 italic px-3 py-2">Key đã bị vô hiệu hóa</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {templates.length === 0 && (
                        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                            Bạn chưa mua template nào.
                        </div>
                    )}
                </div>
            )}

            {/* Services List */}
            {activeTab === 'services' && (
                <div className="space-y-4">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{service.serviceName}</h3>
                                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                                            {service.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Mua ngày: {formatDate(service.purchasedAt)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(service.price, service.currency)}</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-700/50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <KeyField value={service.accessKey} label="Access Key" />
                                    <div className="flex flex-col justify-end">
                                        <span className="text-xs text-slate-500 dark:text-slate-400 mb-1">Ghi chú</span>
                                        <p className="text-sm text-slate-700 dark:text-slate-300">{service.notes}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {services.length === 0 && (
                        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                            Bạn chưa đăng ký dịch vụ nào.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
