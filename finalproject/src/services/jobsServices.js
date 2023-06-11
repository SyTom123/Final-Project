import { del, get, patch, post } from "../utils/request";

export const getJobs = async (id ='')=> {
    let ids = " ";
    if(id !== ''){
        ids =`idCompany=${id}`
    }
    const response =await get(`jobs?${ids}`);
    return response ;
}
export const getJobByID = async (id ='')=> {
    let ids = "";
    if(id !== ''){
        ids =`id=${id}`
    }
    const response =await get(`jobs?${ids}`); 
    return response ;
}
export const createJobs = async(options)=> {
    const result = await post("jobs", options);
    return result;
}
export const updateJobs = async(id, options)=> {
    const result = await patch(`jobs/${id}`, options);
    return result;
}
export const deleteJobs = async(id)=> {
    const result = await del(`jobs/${id}`);
    return result;
}
export const searchJobs = async(tag,city)=> {
    const param = `tags_like=${tag}&city_like=${city}`
    const result = await get(`jobs?${param}`);
    return result;
}