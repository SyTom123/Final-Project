import { get } from "../utils/request";

export const getCity = async ()=> {
    const response =await get("city");
    return response 
}