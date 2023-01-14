import apiInstance from "./instance";

export async function loginRequest(email, password){
  const response = await apiInstance.post("/login", {
    email, password
  });
  return response.data;
}

export async function signupRequest(firstname, lastname, email, password, confirmPassword, description, speciality, linkedin_link, github_link, avatar){
  const response = await apiInstance.post("/signup", {
    firstname, lastname, email, password, confirmPassword, description, speciality, linkedin_link, github_link, avatar
  }); 

  return response.data; 
}