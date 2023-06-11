import { del, get, patch, post } from "../utils/request";

export const getCVs = async (id ='')=> {
    let ids = " ";
    if(id !== ''){
        ids =`idCompany=${id}`
    }
    const response =await get(`cv?${ids}`);
    return response ;
}
export const getCVByID = async (id ='')=> {
    let ids = " ";
    if(id !== ''){
        ids =`id=${id}`
    }
    const response =await get(`cv?${ids}`);
    return response ;
}
export const updateCV = async(id, options)=> {
    const result = await patch(`cv/${id}`, options);
    return result;
}
export const createCV = async( options)=> {
    const result = await post("cv", options);
    return result;
}
export const deleteCV = async(id)=> {
    const result = await del(`cv/${id}`);
    return result;
}
