import './App.css';
import { AppContextProvider } from './AppContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import RegisterScreen from './pages/RegisterScreen';
import LoginScreen from './pages/LoginScreen';
import HomePage from './pages/HomePage';

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path = "/" element = {<Navigate to = "/login" />} />
          <Route path = "/login" element = {<LoginScreen/>} />
          <Route path = "/register" element = {<RegisterScreen/>} />
          <Route path = "/home" element = {<HomePage/>} />

        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
