import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer  flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-2xl">
          <span className='text-green-700'>&lt;</span>
          Pass<span className='text-green-700'>OP/&gt;</span>
        </div>
        <button className=' text-white bg-green-700 flex justify-between items-center my-5 rounded-full ring-1 ring-white'>
          <a target='__blank' href="https://github.com/ProgrammerYousuf" className='flex justify-between items-center'>
            <img className='invert p-1 w-10' src="Icons/github.svg" alt="github logo" />
            <span className='font-bold px-2'>GitHub</span>
          </a>
        </button>
      </div>
    </nav>
  )
}

export default Navbar