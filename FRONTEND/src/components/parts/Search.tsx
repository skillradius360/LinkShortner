import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import instance from '../../axios/Instance'

function Search() {
  const [text, setText] = useState("")
  const [data,setData] = useState({})

  async function caller() {
    try {
      const res = await instance.post("/shorten", {
        originalUrl: text ,
        length: 8
      });
    setData(res.data?.data)
    } catch (error) {
      console.error("Error generating short link:", error);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center text-center pt-20 w-full h-[70%] font-bold'>
      <div className='h-[70%] flex flex-col py-2 justify-between pb-20 items-center'>
        <p className='data text-5xl w-[full] text-orange-600 font-mono'>
          Short links <span className='text-white'>made easy</span>
        </p>

        <input
          type="text"
          placeholder='Enter link'
          onChange={e => setText(e.target.value)}
          value={text}
          className='text-white px-2 border-orange-600 font-mono border-solid border-2 rounded-md 
                     focus:outline-4 w-[80%] outline-orange-600 duration-300 ease-in-out'
        />

        <div className="flex flex-wrap items-center gap-2 md:flex-row">
          <Button
            onClick={caller}
            className="border-orange-600 border-3"
            variant="outline"
          >
            <span className='text-orange-600 font-mono font-bold text-xl'>
              Generate
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Search
