import HomePage from "../HomePage/HomePage"; 
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import Footer from "../Footer/Footer"; 
import { Routes, Route} from 'react-router-dom';


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
        
      </Routes>
      <Footer/>
    </>
    
  );
}

export default App;
