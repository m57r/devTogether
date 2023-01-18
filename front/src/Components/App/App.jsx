import HomePage from "../HomePage/HomePage"; 
import LoginPage from "../LoginPage/LoginPage";
import Footer from "../Footer/Footer"; 
import UsersPage from "../UsersPage/UserPage";
import ProjectsPage from "../ProjectsPage/ProjectsPage";
import { Routes, Route } from 'react-router-dom';

import { TechnologiesByCategoryProvider } from '../../Context/TechnologiesByCategoryContext'; 
import SignupForm from "../SignupForm/SignupForm";

function App() {

  return (
    <>
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
              <TechnologiesByCategoryProvider>
                <SignupForm page={ 1 }/>
              </TechnologiesByCategoryProvider>
            </> }
        />

        <Route 
          path="/signup/2"
          element = { 
            <>
              <TechnologiesByCategoryProvider>
                <SignupForm page={ 2 }/>
              </TechnologiesByCategoryProvider>
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
        path="*" // ici on a la page notFound 404
        element={<h1>NOT FOUND</h1>}
    />
        
      </Routes>
      <Footer/>
    </>
    
  );
}

export default App;
