import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />}/>
            <Route path="/login" element={<LoginPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
