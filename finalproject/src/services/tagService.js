import { get } from "../utils/request";

export const getTags = async ()=> {
    const response =await get("tags");
    return response ;
}