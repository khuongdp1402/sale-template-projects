import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminUsersApi } from '../services/admin';
import { ListParams, User } from '../types/api';

export const useUsersQuery = (params?: ListParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => adminUsersApi.list(params),
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => adminUsersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
