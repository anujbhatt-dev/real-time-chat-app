import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { useThemeStore } from './store/useThemeStore'

type Props = {}

function App({}: Props) {
  const {checkAuth, authUser, isCheckingAuth} = useAuthStore()
  const {themeName} = useThemeStore()
  useEffect(()=>{    
    checkAuth();
  },[checkAuth])

  if(isCheckingAuth) return (
    <div className='h-[calc(100vh-4rem)] flex justify-center items-center'>
          <div>
            <Loader className='animate-spin' size={64}/>
          </div>
    </div>
  )


  return (
    <div data-theme={themeName} className='min-h-screen'>
        <Navbar/>
        <Routes>
          <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login"/>}/>
          <Route path="/login" element={!authUser?<LoginPage/>: <Navigate to={"/"}/>}/>
          <Route path="/signup" element={!authUser?<SignupPage/>: <Navigate to={"/"}/>}/>
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
        </Routes>
    </div>
  )
}

export default App