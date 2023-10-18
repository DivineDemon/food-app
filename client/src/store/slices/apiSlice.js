import { setLoading, setItems, setError } from "./itemSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: build.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `/user?user_id=${data.id}`,
        method: "PATCH",
        body: data.formData,
      }),
    }),
    saveOrder: build.mutation({
      query: (data) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
    }),
    getUserOrders: build.query({
      query: (id) => `/order/user?user_id=${id}`,
      transformResponse: (response) => response.data,
    }),
    fetchItems: build.query({
      query: () => "/item/all",
      transformResponse: (response) => response.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setItems(data));
          dispatch(setLoading(false));
        } catch (error) {
          setError(error);
        }
      },
    }),
    fetchCategories: build.query({
      query: () => "/category/all",
      transformResponse: (response) => response.data,
    }),
    fetchCategoryItems: build.mutation({
      query: (id) =>
        id === 0 ? "item/all" : `/item/category?category_id=${id}`,
      transformResponse: (response) => response.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setItems(data));
          dispatch(setLoading(false));
        } catch (error) {
          setError(error.error.data);
        }
      },
    }),
    fetchSearchItems: build.mutation({
      query: (key) => `/item/search?key=${key}`,
      transformResponse: (response) => response.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setItems(data));
          dispatch(setLoading(false));
        } catch (error) {
          setError(error.error.data);
        }
      },
    }),
    fetchOrder: build.query({
      query: (id) => `/order?order_id=${id}`,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useFetchItemsQuery,
  useFetchCategoriesQuery,
  useFetchCategoryItemsMutation,
  useFetchSearchItemsMutation,
  useSaveOrderMutation,
  useGetUserOrdersQuery,
  useFetchOrderQuery,
} = api;

export default api;
