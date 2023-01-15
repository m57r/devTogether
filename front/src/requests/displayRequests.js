import apiInstance from "./instance";

export async function getAllUsers(searchValue, pageNumber, technologies) {
        const response = await apiInstance.get('/users', {
            params: { pageNumber: pageNumber, searchText : searchValue, technologies },
        });
        return response.data
}

export async function getAllTechnologiesByCategory(){
        const response = await apiInstance.get('/technologies'); 
        console.log(response); 
        return response.data; 
}