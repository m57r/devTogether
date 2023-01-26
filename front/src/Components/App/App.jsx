import HomePage from "../HomePage/HomePage"; 
import LoginPage from "../LoginPage/LoginPage";
import Footer from "../Footer/Footer"; 
import UsersPage from "../UsersPage/UserPage";
import ProjectsPage from "../ProjectsPage/ProjectsPage";
import Page404 from "../Page404/Page404";
import { Routes, Route } from 'react-router-dom';

import { TechnologiesByCategoryProvider } from '../../Context/TechnologiesByCategoryContext'; 
import { FormContextProvider } from "../../Context/FormContext";
import { LoginContextProvider } from "../../Context/LoginContext";
import UserForm from "../UserForm/UserForm";

function App() {

  return (
    <>
      <LoginContextProvider>
        <Routes>
          <Route
            path="/" 
            element={(
              <>
                <HomePage/>
              </>
            )}
          />

          <Route
            path="/login" 
            element={(
              <>
                <LoginPage />
              </>
            )}
          />

          <Route path="/signup"
            element = { 
              <>
                <FormContextProvider>
                  <TechnologiesByCategoryProvider>
                    <UserForm page={ 1 }/>
                  </TechnologiesByCategoryProvider>
                </FormContextProvider>
              </> }
          />

          <Route 
            path="/signup/2"
            element = { 
              <>
              <FormContextProvider>
                  <TechnologiesByCategoryProvider>
                    <UserForm page={ 2 }/>
                  </TechnologiesByCategoryProvider>
                </FormContextProvider>
              </> }
          />
        

          <Route
            path="/users" 
            element={(
              <>
                <TechnologiesByCategoryProvider>
                  <UsersPage/>
                </TechnologiesByCategoryProvider>
              </>
            )}
          />

          <Route
              path="/projects" 
              element={(
                <>
                  <TechnologiesByCategoryProvider>
                    < ProjectsPage />
                  </TechnologiesByCategoryProvider>
                </>
              )}
            />

          <Route
              path="*" 
              element={(<Page404/>)}
          />
          
        </Routes>
        <Footer/>
      </LoginContextProvider>
    </>
    
  );
}

export default App;
