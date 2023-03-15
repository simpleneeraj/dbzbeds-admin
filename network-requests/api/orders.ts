import axios from "network-requests/axios";

export const bulkOrderUpdate = (ids: string[], status: string): Promise<any> =>
  axios.patch<any>(`/order/bulk-update`, { ids, status });
export const OrderUpdateById = (_id: string, payload: any): Promise<any> =>
  axios.put<any>(`/order/${_id}`, payload);
