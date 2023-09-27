import { createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk("register", async (userData) => {
  let response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  response = await response.json();

  if (response.data === undefined) {
    return response;
  } else {
    return response.data;
  }
});

export const login = createAsyncThunk("login", async (userData) => {
  let response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.status === 404) {
    response = await response.json();
    throw new Error(response.message);
  }

  response = await response.json();
  if (response.data === undefined) {
    return response;
  } else {
    return response.data;
  }
});

export const fetchItems = createAsyncThunk("items", async () => {
  let response = await fetch(`${process.env.REACT_APP_BASE_URL}/item/all`, {
    method: "GET",
  });

  response = await response.json();
  return response.data;
});

export const fetchCategories = createAsyncThunk("categories", async () => {
  let response = await fetch(`${process.env.REACT_APP_BASE_URL}/category/all`, {
    method: "GET",
  });

  response = await response.json();
  return response.data;
});

export const fetchCategoryItems = createAsyncThunk(
  "categoryItems",
  async (id) => {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/item/category?category_id=${id}`,
      {
        method: "GET",
      }
    );

    response = await response.json();
    return response.data;
  }
);

export const fetchSearchItems = createAsyncThunk("searchItems", async (key) => {
  let response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/item/search?key=${key}`,
    {
      method: "GET",
    }
  );

  response = await response.json();
  return response.data;
});