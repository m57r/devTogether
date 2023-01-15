import HomePage from "../HomePage/HomePage"; 
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import Footer from "../Footer/Footer"; 
import UsersPage from "../UsersPage/UsersPage";
import { Routes, Route} from 'react-router-dom';

import { TechnologiesByCategoryProvider } from '../../Context/TechnologiesByCategoryContext'; 

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

        <Route
          path="/signup" 
          element={(
            <>
              <SignupPage />
            </>
          )}
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
                <UsersPage/>
              </TechnologiesByCategoryProvider>
            </>
          )}
        />
        
      </Routes>
      <Footer/>
    </>
    
  );
}

export default App;
