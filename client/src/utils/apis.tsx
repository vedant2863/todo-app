import axios from "axios";

export const signupUser = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/api/auth/register", {
    username,
    email,
    password,
  });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  console.log(data);
  
  return data;
};

export const loginUser = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/api/auth/login", {
    username,
    email,
    password,
  });
  if (res.status !== 200) {
    throw new Error("Unable to Login");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.post("/api/auth/logout");
  if (res.status !== 200) {
    throw new Error("Unable to Logout");
  }
  const data = await res.data;
  return data;
};
