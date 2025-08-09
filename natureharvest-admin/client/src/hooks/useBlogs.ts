import { useMutation, useQuery } from '@apollo/client';
import { CREATE_BLOG, UPDATE_BLOG, DELETE_BLOG } from '../services/graphql/mutations';
import { GET_ALL_BLOGS, GET_BLOG_BY_ID } from '../services/graphql/queries';

// Blog mutations
export const useCreateBlog = () => {
  return useMutation(CREATE_BLOG, {
    refetchQueries: [{ query: GET_ALL_BLOGS }]
  });
};

export const useUpdateBlog = () => {
  return useMutation(UPDATE_BLOG, {
    refetchQueries: [{ query: GET_ALL_BLOGS }]
  });
};

export const useDeleteBlog = () => {
  return useMutation(DELETE_BLOG, {
    refetchQueries: [{ query: GET_ALL_BLOGS }]
  });
};

// Blog queries
export const useBlogs = () => {
  return useQuery(GET_ALL_BLOGS);
};

export const useBlog = (id: string) => {
  return useQuery(GET_BLOG_BY_ID, { 
    variables: { id },
    skip: !id 
  });
}; 