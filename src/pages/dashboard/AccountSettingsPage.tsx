import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/useAuth';
import { useToast } from '../../components/auth/Toast';

export const AccountSettingsPage: React.FC = () => {
    const { user, updateProfile, updatePassword } = useAuth();
    const { showToast } = useToast();

    // Profile Form State
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        phone: ''
    });
    const [profileLoading, setProfileLoading] = useState(false);

    // Password Form State
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [passwordLoading, setPasswordLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setProfileData({
                username: user.username,
                email: user.email,
                phone: user.phone || ''
            });
        }
    }, [user]);

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileLoading(true);

        const result = await updateProfile({
            username: profileData.username,
            email: profileData.email,
            phone: profileData.phone
        });

        setProfileLoading(false);

        if (result.success) {
            showToast('Cập nhật thông tin thành công', 'success');
        } else {
            showToast(result.error?.message || 'Cập nhật thất bại', 'error');
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            showToast('Mật khẩu mới không khớp', 'error');
            return;
        }

        setPasswordLoading(true);

        const result = await updatePassword(passwordData.currentPassword, passwordData.newPassword);

        setPasswordLoading(false);

        if (result.success) {
            showToast('Đổi mật khẩu thành công', 'success');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            });
        } else {
            showToast(result.error?.message || 'Đổi mật khẩu thất bại', 'error');
        }
    };

    return (
        <div className="space-y-8 max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Cài đặt tài khoản</h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Quản lý thông tin cá nhân và bảo mật tài khoản.
                </p>
            </div>

            {/* Profile Section */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                    Thông tin cá nhân
                </h2>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Tên đăng nhập
                            </label>
                            <input
                                type="text"
                                value={profileData.username}
                                onChange={e => setProfileData({ ...profileData, username: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={profileData.email}
                                onChange={e => setProfileData({ ...profileData, email: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Số điện thoại
                            </label>
                            <input
                                type="tel"
                                value={profileData.phone}
                                onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                placeholder="Chưa cập nhật"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={profileLoading}
                            className="px-6 py-2 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50"
                        >
                            {profileLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Password Section */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                    Đổi mật khẩu
                </h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Mật khẩu hiện tại
                        </label>
                        <input
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Mật khẩu mới
                            </label>
                            <input
                                type="password"
                                value={passwordData.newPassword}
                                onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                required
                                minLength={8}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Xác nhận mật khẩu mới
                            </label>
                            <input
                                type="password"
                                value={passwordData.confirmNewPassword}
                                onChange={e => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                required
                                minLength={8}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={passwordLoading}
                            className="px-6 py-2 bg-slate-800 dark:bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
                        >
                            {passwordLoading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
