import React, { useState , useEffect } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth'
import { login,logout } from './store/authSlice';
import { Header,Footer } from './components';
import { Outlet } from 'react-router-dom';
const App = () => {

  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((useData)=>{
      if(useData){
        dispatch(login({useData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])

  console.log(import.meta.env.VITE_APPWRITE_URL)
  // conditional rendering

  return !loading? (
    <div className='min-h-screen flex flex-wrap text-center bg-slate-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          TODO:{/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App