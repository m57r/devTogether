import apiInstance from "./instance";

export async function checkEmailAvailability(email){
  const response = await apiInstance.post("/check-email", {
    email
  })
  return response.data; 
}

export async function loginRequest(email, password){
  const response = await apiInstance.post("/login", {
    email, password
  });
  return response.data;
}

export async function signupRequest(
    firstname, lastname, email, password, confirmPassword, description, speciality, technologies, general_conditions, privacy_policy
  ){
  const response = await apiInstance.post("/signup", {
    firstname, lastname, email, password, confirmPassword, description, speciality, technologies, general_conditions, privacy_policy
  }); 

  return response.data; 
}