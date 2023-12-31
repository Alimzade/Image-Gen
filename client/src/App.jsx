import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import { logo } from './assets';
import { Home, CreatePost, Delete } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 py-4 border-b border-b-[#e6ebf4]'>
        <Link to="/">
          <img src={logo} alt="logo" className='w-36  mt-3 ml-5 object-contain' />
        </Link>

        <Link to="/create-post" className='font-inter font-medium bg-[#523df5] text-white px-4 py-2 mr-5 rounded-md'>Create</Link>
      </header>

      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/deletebyid' element={<Delete />} />
        </Routes>

        <Link to="/deletebyid" className='font-inter font-medium bg-[#f9fafb] text-[#f9fafb] text-white rounded-md absolute right-0'>Delete</Link>
      </main>
    </BrowserRouter>
  )
}

export default App