import api from "./api";

export const createCategory = async (data) => {

  const response = await api.post(
    "/admin/categories",
    data
  );

  return response.data;

};

export const getCategories = async () => {

  const response = await api.get(
    "/admin/categories"
  );

  return response.data;

};

export const deleteCategory = async (id,data) => {

  const response = await api.delete(
    `/admin/categories/${id}`,
    data
  );

  return response.data;

};
export const updateCategory = async (id, data) => {

  const response = await api.put(
    `/admin/categories/${id}`,
    data
  );

  return response.data;

};