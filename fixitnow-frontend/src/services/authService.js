import api from "./api";

export const loginAdmin = async (data) => {

  const response = await api.post(
    "/admin/auth/login",
    data
  );

  return response.data;

};