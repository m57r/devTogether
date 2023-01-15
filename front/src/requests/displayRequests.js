import apiInstance from "./instance";

export async function getAllUsers(pageNumber, searchText, technologies) {
    try{
        const response = await apiInstance.get('/users', {
            params: { pageNumber: pageNumber, serachText : searchText, technologies },
        });
        return response.data
    }catch(error){
        console.log(error)
    }
    
}

export async function getAllTechnologies(){
    try{
        const response = await apiInstance.get('/technologies'); 
        return response.data; 
    }catch(err){
        console.log(err); 
    }
}