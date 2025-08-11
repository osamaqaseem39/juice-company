import { useMutation } from '@apollo/client';
import { LOGIN, REGISTER, CREATE_USER, UPDATE_USER, DELETE_USER } from '../services/graphql/mutations';

// Auth mutations
export const useLogin = () => {
  return useMutation(LOGIN);
};

export const useRegister = () => {
  return useMutation(REGISTER);
};

export const useCreateUser = () => {
  return useMutation(CREATE_USER);
};

export const useUpdateUser = () => {
  return useMutation(UPDATE_USER);
};

export const useDeleteUser = () => {
  return useMutation(DELETE_USER);
}; 