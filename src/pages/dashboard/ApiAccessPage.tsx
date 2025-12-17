import React, { useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import { useToast } from '../../components/auth/Toast';
import { KeyField } from '../../components/purchases/KeyField';
import { generateKey } from '../../data/purchases';

export const ApiAccessPage: React.FC = () => {
    const { user } = useAuth();
    const { showToast } = useToast();
    // Mock API key stored in state (in real app, fetch from backend)
    const [apiKey, setApiKey] = useState('kwx_live_' + generateKey('sk', 6));

    const handleRotateKey = () => {
        if (confirm('Bạn có chắc chắn muốn đổi API Key? Key cũ sẽ không còn hoạt động ngay lập tức.')) {
            setApiKey('kwx_live_' + generateKey('sk', 6));
            showToast('Đã tạo API Key mới thành công', 'success');
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">API Access</h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Quản lý API key và xem tài liệu tích hợp để kết nối với hệ thống K-WingX.
                </p>
            </div>

            {/* API Key Section */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">API Key của bạn</h2>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-700/50 mb-4">
                    <KeyField value={apiKey} label="Secret Key (Giữ bí mật)" />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleRotateKey}
                        className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
                    >
                        Rotate Key (Đổi key mới)
                    </button>
                </div>
            </div>

            {/* Integration Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Thông tin kết nối</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Base URL</label>
                            <code className="block w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded text-sm font-mono text-slate-700 dark:text-slate-300">
                                https://api.k-wingx.com/v1
                            </code>
                        </div>
                        <div>
                            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Authentication Header</label>
                            <code className="block w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded text-sm font-mono text-slate-700 dark:text-slate-300">
                                X-API-KEY: {apiKey.substring(0, 12)}...
                            </code>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Endpoints phổ biến</h2>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-sm">
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-bold font-mono">GET</span>
                            <span className="text-slate-700 dark:text-slate-300 font-mono">/templates</span>
                            <span className="text-slate-400 text-xs ml-auto">Lấy danh sách template</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-bold font-mono">POST</span>
                            <span className="text-slate-700 dark:text-slate-300 font-mono">/orders</span>
                            <span className="text-slate-400 text-xs ml-auto">Tạo đơn hàng mới</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-bold font-mono">POST</span>
                            <span className="text-slate-700 dark:text-slate-300 font-mono">/provision</span>
                            <span className="text-slate-400 text-xs ml-auto">Kích hoạt dịch vụ</span>
                        </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                        <a href="#" className="text-cyan-600 dark:text-cyan-400 text-sm font-medium hover:underline flex items-center gap-1">
                            Xem tài liệu đầy đủ
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Code Example */}
            <div className="bg-slate-900 rounded-xl p-6 shadow-lg overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white">Example Request (Node.js)</h2>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                </div>
                <pre className="font-mono text-sm text-slate-300 overflow-x-auto">
                    {`const fetch = require('node-fetch');

const response = await fetch('https://api.k-wingx.com/v1/templates', {
  headers: {
    'X-API-KEY': '${apiKey}'
  }
});

const data = await response.json();
console.log(data);`}
                </pre>
            </div>
        </div>
    );
};
