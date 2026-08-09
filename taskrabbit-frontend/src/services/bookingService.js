import api from "./api";

export const createBooking =
async(data)=>{

const response =
await api.post(

"/admin/bookings",

data

);

return response.data;

};

export const getBookings =
async()=>{

const response =
await api.get(

"/admin/bookings"

);

return response.data;

};

export const updateBookingStatus =
async(id,status)=>{

const response =
await api.put(

`/admin/bookings/${id}/status`,

{

booking_status:
status

}

);

return response.data;

};

export const deleteBooking =
async(id)=>{

const response =
await api.delete(

`/admin/bookings/${id}`

);

return response.data;

};