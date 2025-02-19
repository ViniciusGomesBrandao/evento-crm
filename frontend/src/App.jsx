import AuthGuard from './_guards/AuthGuard';
import './App.css'
import RegisterPage from './auth/register/RegisterPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main';
import LoginPage from './auth/login/LoginPage';
import ListPage from './pages/events/list/ListPage';
import CreatePage from './pages/events/create/CreatePage';
import EditPage from './pages/events/edit/EditPage';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/pages/*"
          element={
            <AuthGuard>
              <MainPage />
            </AuthGuard>
          }
        >
          <Route path="events/list" element={<ListPage />} />
          <Route path="events/create" element={<CreatePage />} />
          <Route path="events/edit/:id" element={<EditPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
