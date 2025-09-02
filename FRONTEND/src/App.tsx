import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import Search from './components/parts/Search'



function App() {
  const [count, setCount] = useState(0)



  return (
    <div
      className='bg-[#0c0a09] h-screen w-screen bg-cover bg-center'

    >
      <nav className='w-full flex justify-center items-center'>
        <p className='text-orange-600 text-3xl font-bold m-3'>Short
          <span className='text-white'>ify</span></p>
      </nav>


     <Search/>

    </div>
  )
}

export default App
