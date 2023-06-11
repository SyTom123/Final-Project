import {get, patch, post} from '../utils/request'
export const getCompany = async (email = '', password = "") => {
    let email2 = "";
    if(email !== "") {
        email2 =`?email=${email}`;
    }
    let pass = "";
    if(password !== ""){
        pass=`&password=${password}`;
    }

    const result =await get(`company${email2}${pass}`);
    return result;
}
export const getCompanyByID = async (id ='')=> {
    let ids = " ";
    if(id !== ''){
        ids =`id=${id}`
    }
    const response =await get(`company?${ids}`);
    return response ;
}

export const createCompany = async(options)=> {
    const result = await post("company", options);
    return result;
}

export const updateCompany = async (id,options)=> {
    const result = await patch(`company/${id}`, options);
    return result;
}