import axios from "network-requests/axios";

export const bulkOrderUpdate = (ids: string[], status: string): Promise<any> =>
  axios.patch<any>(`/order/bulk-update`, { ids, status });
export const OrderUpdateById = (_id: string, payload: any): Promise<any> =>
  axios.patch<any>(`/order/${_id}`, payload);
export const UpdateOrderHistoryById = (
  _id: string,
  payload: any
): Promise<any> => axios.patch<any>(`/order/${_id}/history`, payload);
