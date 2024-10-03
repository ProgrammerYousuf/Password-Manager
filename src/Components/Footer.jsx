import React from 'react'
import Logo from './Logo'
const Footer = () => {
    return (
        <div className='bg-slate-800 text-white mt-10 p-20 w-full'>
            <div className='flex md:flex-row flex-col justify-center items-center w-full'>
                <div className='flex flex-col justify-center items-center md:w-1/2 w-full'>
                    <Logo />
                    <div className='flex justify-center items-center w-full text-[2.5vw] md:text-[2vw] mx-auto'>
                        Created with <img src="Icons/heart.png" alt="Heart" className='w-5 h-5 mx-2 my-5' /> by Programmer-Yousuf
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center md:w-1/2 w-full'>
                    <h1 className='text-3xl'>Social Media</h1>
                    <h1 className='text-3xl'>Links</h1>
                    <button className=' text-white bg-green-700 flex justify-between items-center my-5 rounded-full ring-1 ring-white'>
                        <a target='__blank' href="https://github.com/ProgrammerYousuf" className='flex justify-between items-center'>
                            <img className='invert p-1 w-10' src="Icons/github.svg" alt="github logo" />
                            <span className='font-bold px-2'>GitHub</span>
                        </a>
                    </button>
                    <button className=' text-white bg-blue-700  flex justify-between items-center my-5 rounded-full ring-1 ring-white'>
                        <a target='__blank' href="https://www.facebook.com/profile.php?id=61562212837772" className='flex justify-between items-center'>
                            <img className='p-1 w-10' src="Icons/facebook.svg" alt="facebook logo" />
                            <span className='font-bold px-2'>Facebook</span>
                        </a>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Footer