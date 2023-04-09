import './Post';
import './Header';
import './App.css';
import Layout from './Layout';
import {Route, Routes} from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserContextProvider } from './userContext';
import CreatePost from './pages/CreatePost';
import PagePost from './pages/PagePost';
import EditPost from './pages/EditPost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element = {<HomePage/>} />
          <Route path = {'/login'} element = {<Login/>} />
          <Route path='/register' element = {<Register/>} />
          <Route path='/create' element={<CreatePost/>} />
          <Route path='/posts/:id' element={<PagePost/>} />
          <Route path='/edit/:id' element={<EditPost/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
