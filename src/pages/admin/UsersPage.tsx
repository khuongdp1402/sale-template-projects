import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/useAuth';
import { RequireAuth } from '../../components/auth/RequireAuth';
import { FiSearch, FiEdit, FiTrash2, FiUserPlus, FiX } from 'react-icons/fi';

interface User {
    id: string;
    username: string;
    email: string;
    phone?: string;
    createdAt: string;
}

export const UsersPage: React.FC = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({ username: '', email: '', phone: '' });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        try {
            const usersJson = localStorage.getItem('kwx_users');
            if (usersJson) {
                const allUsers = JSON.parse(usersJson);
                // Remove password field for display
                const usersWithoutPassword = allUsers.map((u: any) => {
                    const { password, ...userWithoutPassword } = u;
                    return userWithoutPassword;
                });
                setUsers(usersWithoutPassword);
            }
        } catch (error) {
            console.error('Error loading users:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(
        (u) =>
            u.username.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            (u.phone && u.phone.includes(search))
    );

    const handleAddUser = () => {
        setFormData({ username: '', email: '', phone: '' });
        setIsAddModalOpen(true);
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setFormData({ username: user.username, email: user.email, phone: user.phone || '' });
        setIsEditModalOpen(true);
    };

    const handleDeleteUser = (userId: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            try {
                const usersJson = localStorage.getItem('kwx_users');
                if (usersJson) {
                    const allUsers = JSON.parse(usersJson);
                    const updatedUsers = allUsers.filter((u: any) => u.id !== userId);
                    localStorage.setItem('kwx_users', JSON.stringify(updatedUsers));
                    loadUsers();
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleSaveUser = () => {
        // Validation
        if (!formData.username || !formData.email) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        try {
            const usersJson = localStorage.getItem('kwx_users');
            if (usersJson) {
                const allUsers = JSON.parse(usersJson);

                if (isEditModalOpen && selectedUser) {
                    // Update existing user
                    const userIndex = allUsers.findIndex((u: any) => u.id === selectedUser.id);
                    if (userIndex !== -1) {
                        allUsers[userIndex] = {
                            ...allUsers[userIndex],
                            username: formData.username,
                            email: formData.email,
                            phone: formData.phone || undefined,
                        };
                        localStorage.setItem('kwx_users', JSON.stringify(allUsers));
                        loadUsers();
                        setIsEditModalOpen(false);
                        setSelectedUser(null);
                    }
                } else {
                    // Add new user (mock - in real app would have password)
                    const newUser = {
                        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                        username: formData.username,
                        email: formData.email,
                        phone: formData.phone || undefined,
                        password: '', // Would be hashed in real app
                        createdAt: new Date().toISOString(),
                    };
                    allUsers.push(newUser);
                    localStorage.setItem('kwx_users', JSON.stringify(allUsers));
                    loadUsers();
                    setIsAddModalOpen(false);
                }
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    if (loading) {
        return (
            <RequireAuth>
                <div className="flex items-center justify-center h-64">
                    <div className="text-slate-600 dark:text-slate-400">Đang tải...</div>
                </div>
            </RequireAuth>
        );
    }

    return (
        <RequireAuth>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Quản lý người dùng</h1>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                            Quản lý tất cả tài khoản người dùng trong hệ thống
                        </p>
                    </div>
                    <button
                        onClick={handleAddUser}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                    >
                        <FiUserPlus className="h-5 w-5" />
                        Thêm người dùng
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                </div>

                {/* Users Table */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Tên đăng nhập
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Số điện thoại
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Ngày tạo
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">
                                                {user.username}
                                                {user.id === currentUser?.id && (
                                                    <span className="ml-2 text-xs text-sky-600 dark:text-sky-400">(Bạn)</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-600 dark:text-slate-300">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-600 dark:text-slate-300">{user.phone || '-'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-600 dark:text-slate-300">
                                                {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="text-sky-600 hover:text-sky-700 dark:text-sky-400 p-2 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded"
                                                >
                                                    <FiEdit className="h-4 w-4" />
                                                </button>
                                                {user.id !== currentUser?.id && (
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="text-red-600 hover:text-red-700 dark:text-red-400 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                                    >
                                                        <FiTrash2 className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredUsers.length === 0 && (
                            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                                Không tìm thấy người dùng nào
                            </div>
                        )}
                    </div>
                </div>

                {/* Add User Modal */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}>
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Thêm người dùng</h2>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    <FiX className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        Tên đăng nhập
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSaveUser}
                                    className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                                >
                                    Thêm
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit User Modal */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}>
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Chỉnh sửa người dùng</h2>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    <FiX className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        Tên đăng nhập
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSaveUser}
                                    className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </RequireAuth>
    );
};

