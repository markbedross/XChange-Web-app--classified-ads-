import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import { useState } from 'react';

function App() {

  const API = "http://localhost:8000"
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage API={API}/>}/>
            <Route path="/login" element={<LoginPage API={API}/>}/>
            <Route path="/register" element={<RegisterPage API={API}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
