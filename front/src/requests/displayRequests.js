import apiInstance from "./instance";

export async function getAllUsers(pageNumber) {
    try{
        const response = await apiInstance.get('/users', {
            params: { pageNumber: pageNumber },
        });
        return response.data
    }catch(error){
        console.log(error)
    }
    
}