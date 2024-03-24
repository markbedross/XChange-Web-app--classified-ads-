import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import { useEffect, useState } from 'react';

function App() {

  const API = "http://localhost:8000"
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))

    setUser(user)
    console.log("app: ", user)
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} setUser={setUser}/>}>
            <Route path="/" element={<HomePage API={API} setUser={setUser}/>}/>
            <Route path="/login" element={<LoginPage API={API} setUser={setUser}/>}/>
            <Route path="/register" element={<RegisterPage API={API} setUser={setUser}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
