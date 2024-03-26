import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import { MainContextProvider } from './contexts/MainContext';
import ProfilePage from './components/ProfilePage';
import CreateAdPage from './components/CreateAdPage';
import AdPage from './components/AdPage';

function App() {

  return (
    <div className="App">
      <MainContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HomePage />}/>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile/:subpage?" element={<ProfilePage />} />
              <Route path="/create" element={<CreateAdPage />} />
              <Route path="/create/:id" element={<CreateAdPage />} />
              <Route path="/ad/:id" element={<AdPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MainContextProvider>
    </div>
  );
}

export default App;
