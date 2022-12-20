import { sendEtagResponse } from "next/dist/server/send-payload";
import { api } from "../ServiceHelper";

export const fetchQuartierData = async (id) => {
    return await api.get('/users/').then((response)=> response.data)
}