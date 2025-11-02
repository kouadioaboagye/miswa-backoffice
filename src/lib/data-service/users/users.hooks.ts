import { queryClient } from '@/app/provider';
import { ListParams } from '@/features/admin/api/endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
    createUser,
    deleteUser,
    getCountries,
    getRoles,
    getUser,
    getUsers,
    updateUser,
    updateUserStatus
} from './users.queries';

const queryKey = {
    users: 'users',
    roles: 'roles',
    countries: 'countries'
};

export const useListUsersQuery = (params?: ListParams) => {
    return useQuery({
        queryKey: [queryKey.users, params],
        queryFn: () => getUsers(params)
    });
};
export const useListRoleQuery = (params?: ListParams) => {
    return useQuery({
        queryKey: [queryKey.roles, params],
        queryFn: () => getRoles(params)
    });
};
export const useListCountriesQuery = (params?: ListParams) => {
    return useQuery({
        queryKey: [queryKey.countries, params],
        queryFn: () => getCountries(params)
    });
};

export const useDetailsUserQuery = (id: number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => getUser(id)
    });
};

export const useCreateUserMutation = () => {
    return useMutation({
        mutationFn: (data: any) => createUser(data),
        onSuccess: () => {
            // Invalidate and refetch properties list
            toast.success('User created successfully');
            queryClient.invalidateQueries({ queryKey: [queryKey.users] });
        },

        onError: (error) => {
            toast.error(
                error instanceof Error ? error.message : 'Error creating user'
            );
        }
    });
};
export const useDeleteUserMutation = () => {
    return useMutation({
        mutationFn: (id: number) => deleteUser(id),
        onSuccess: () => {
            // Invalidate and refetch properties list
            toast.success('User deleted successfully');
            queryClient.invalidateQueries({ queryKey: [queryKey.users] });
        },

        onError: (error) => {
            toast.error(
                error instanceof Error ? error.message : 'Error deleting user'
            );
        }
    });
};
export const useUpdateUserStatusMutation = () => {
    return useMutation({
        mutationFn: (id: any) => updateUserStatus(id),
        onSuccess: () => {
            // Invalidate and refetch properties list
            toast.success('User updated successfully');
            queryClient.invalidateQueries({ queryKey: [queryKey.users] });
        },

        onError: (error) => {
            toast.error(
                error instanceof Error ? error.message : 'Error updating user'
            );
        }
    });
};

export const useUpdateUserMutation = () => {
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) =>
            updateUser({ id, data }),
        onSuccess: () => {
            // Invalidate and refetch properties list
            toast.success('User updated successfully');
            queryClient.invalidateQueries({ queryKey: [queryKey.users] });
        },

        onError: (error) => {
            toast.error(
                error instanceof Error ? error.message : 'Error updating user'
            );
        }
    });
};
