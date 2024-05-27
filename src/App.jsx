import './App.css'
import ForgotPassForm from './components/auth/ForgotPassForm';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ContactList from './components/contacts/ContactList';
import CreateContact from './components/contacts/CreateContact';
import Dashboard from './components/template-admin/Dashboard';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';
import ContactPage from './pages/ClientPage';
import { Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import Loading from './components/template-admin/Loading';
import { ToastContainer } from "react-toastify";
import StoriesList from './components/stories/StoriesList';
import CreateStories from './components/stories/CreateStories';
import { useSelector } from 'react-redux';
import { loadingSelector } from './store/selectors';
import ChaperList from './components/stories/ChaperList';
import Home from './components/pages-client/Home';
import DetailStory from './components/pages-client/DetailStory';
import StoryByCategory from './components/pages-client/StoryByCategory';
import DetailChaper from './components/pages-client/DetailChaper';
function App() {
  const loading = useSelector(loadingSelector);
  return (
    <>
      {loading ? <Loading /> : ""}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<ContactPage />}>
          <Route index element={<Home />} />
          <Route  path='/:slug' element={<DetailStory />} />
          <Route  path='/the-loai/:slugCat' element={<StoryByCategory />} />
          <Route  path='/:slugStory/:slugChaper' element={<DetailChaper />} />
        </Route>
        <Route path='/admin' element={<AdminPage />}>
            <Route index element={<Dashboard />} />
            <Route path='contact/list' element={<ContactList />} />
            <Route path='contact/create' element={<CreateContact />} />
            <Route path='stories/list' element={<StoriesList />} />
            <Route path='stories/create' element={<CreateStories />} />
            <Route path='chapers/:story_id/list' element={<ChaperList />} />
        </Route>
        <Route path='/auth'   element={<AuthPage />} >
          <Route path='login' element={<LoginForm />} />
          <Route path='register' element={<RegisterForm />} />
          <Route path='forgot-password' element={<ForgotPassForm />} />
        </Route>
        <Route path='/profile' element={<Profile />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
