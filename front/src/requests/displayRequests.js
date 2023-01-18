import apiInstance from "./instance";

export async function getAllUsers(searchValue, pageNumber, technologies) {
        const response = await apiInstance.get('/users', {
            params: { pageNumber: pageNumber, searchText : searchValue, technologies },
        });
        return response.data
}

export async function getAllProjects(searchValue, pageNumber, technologies) {
        const response = await apiInstance.get('/projects', {
            params: { pageNumber: pageNumber, searchText : searchValue, technologies },
        });
        return response.data
}

export async function getAllTechnologiesByCategory(){
        const response = await apiInstance.get('/technologies'); 
        return response.data; 
}