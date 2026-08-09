import api from "./api";

export const createPayment =
async(data)=>{

const response =
await api.post(

"/admin/payments",

data

);

return response.data;

};

export const getPayments =
async()=>{

const response =
await api.get(

"/admin/payments"

);

return response.data;

};

export const updatePaymentStatus =
async(id,status)=>{

const response =
await api.put(

`/admin/payments/${id}/status`,

{

payment_status:
status

}

);

return response.data;

};

export const getRevenue =
async()=>{

const response =
await api.get(

"/admin/payments/revenue"

);

return response.data;

};