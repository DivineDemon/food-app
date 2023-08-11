import { createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk("user/Register", async (userData) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await response.json();
  return data.response;
});

export const login = createAsyncThunk("user/Login", async (userData) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  return data.user;
});

export const fetchItems = createAsyncThunk("get/Items", async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/item/all`, {
    method: "GET",
  });

  const data = await response.json();
  return data.response;
});

export const fetchCategories = createAsyncThunk("get/Categories", async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/category/all`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
  return data.response;
});
