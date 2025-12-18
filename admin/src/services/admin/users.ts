import { createApiCall, api } from '../apiAdapter';
import { mockServer } from '../mock/mockServer';
import { ListParams } from '../../types/api';
import { UserDto, PagedResult } from '../contracts';

export const adminUsersApi = {
  list: createApiCall(
    (params?: ListParams) => api.get<PagedResult<UserDto>>('/users', params),
    (params?: ListParams) => mockServer.getUsers(params)
  ),
  getById: createApiCall(
    (id: string) => api.get<UserDto>(`/users/${id}`),
    async (id: string) => (await mockServer.getUsers({ pageSize: 100 })).items.find(u => u.id === id)!
  ),
  update: createApiCall(
    (id: string, data: Partial<UserDto>) => api.put<UserDto>(`/users/${id}`, data),
    (id: string, data: Partial<UserDto>) => mockServer.updateUser(id, data)
  ),
};
