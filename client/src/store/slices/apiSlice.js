import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/user?user_id=${data.id}`,
        method: "PATCH",
        body: data.formData,
      }),
    }),
    saveOrder: builder.mutation({
      query: (data) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
    }),
    getUserOrders: builder.query({
      query: (id) => `/order/user?user_id=${id}`,
    }),
    fetchItems: builder.query({
      query: () => "/item/all",
    }),
    fetchCategories: builder.query({
      query: () => "/category/all",
    }),
    fetchCategoryItems: builder.query({
      query: (id) => `/item/category?category_id=${id}`,
    }),
    fetchSearchItems: builder.query({
      query: (key) => `/item/search?key=${key}`,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useFetchItemsQuery,
  useFetchCategoriesQuery,
  useFetchCategoryItemsQuery,
  useFetchSearchItemsQuery,
  useSaveOrderMutation,
  useGetUserOrdersQuery,
} = api;

export default api;
