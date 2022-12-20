import axios from "axios";
import exp from "constants";

export const api =axios.create({
    baseURL :'http://jsonplaceholder.typicode.com',
    timeout : 10000,
    headers : {
        accept: 'application/json'
    }
})