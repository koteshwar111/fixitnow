import api from "./api";

export const createTasker =
async (data) => {

const response =
await api.post(
"/admin/taskers",
data
);

return response.data;

};

export const getTaskers =
async () => {

const response =
await api.get(
"/admin/taskers"
);

return response.data;

};
export const approveTasker =
async(id)=>{

const response =
await api.put(

`/admin/taskers/${id}/approve`

);

return response.data;

};
export const deleteTasker =
async(id)=>{

const response =
await api.delete(

`/admin/taskers/${id}`

);

return response.data;

};
export const updateTasker =
async(id,data)=>{

const response =
await api.put(

`/admin/taskers/${id}`,

data

);

return response.data;

};