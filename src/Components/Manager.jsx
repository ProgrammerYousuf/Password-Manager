import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
    let eye = "Icons/eye.png";
    let type = "password";
    const [show, setshow] = useState(false);
    const [form, setForm] = useState({
        Site: "",
        Username: "",
        Password: "",
    });
    const [passwordArray, setPasswordArray] = useState([]);

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }


    useEffect(() => {
        getPasswords()
    }, [])

    const savePassword = async () => {
        if (form.Site.length > 3 && form.Username.length > 3 && form.Password.length > 3) {

            // If any such id exists in the db, delete it 
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            // Otherwise clear the form and show toast
            setForm({ Site: "", Username: "", Password: "" })
            toast.success(" Password Saved Successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error(" Password Not Saved!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))

            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }

    const editPassword = (id) => {
        setForm({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        toast.success("Copy To ClipBoard!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    };

    const showPassword = () => {
        if (show) {
            setshow(false);
        } else {
            setshow(true);
        }
    };

    if (show) {
        eye = "Icons/eyecross.png";
        type = "text";
    } else {
        eye = "Icons/eye.png";
        type = "password";
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="dark"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
            </div>
            <div className="px-2 md:px-0 md:mycontainer ">
                <div className="logo font-bold text-2xl text-black text-center">
                    <span className="text-green-700">&lt;</span>
                    Pass<span className="text-green-700">OP/&gt;</span>
                </div>
                <p className="text-green-900 text-lg text-center">
                    Your own Password Manager
                </p>
                <div className="text-black flex flex-col p-4 gap-3">
                    <input
                        value={form.Site}
                        onChange={handleChange}
                        name="Site"
                        className="rounded-full border-green-500 w-full outline-none border-2 p-4 py-1"
                        type="text"
                        placeholder="Enter Website Url Or App Name"
                    />
                    <div className="flex w-full justify-between gap-3 md:flex-row flex-col">
                        <input
                            value={form.Username}
                            onChange={handleChange}
                            name="Username"
                            className="rounded-full border-green-500 w-full outline-none border-2 p-4 py-1"
                            type="text"
                            placeholder="Enter Username Or Email"
                        />
                        <div className="relative">
                            <input
                                value={form.Password}
                                onChange={handleChange}
                                name="Password"
                                className="rounded-full border-green-500 w-full outline-none border-2 p-4 py-1"
                                type={type}
                                placeholder="Enter Password"
                            />
                            <span className="absolute right-[3px] top-[5px] ">
                                <img
                                    className="p-1 cursor-pointer"
                                    width={26}
                                    src={eye}
                                    alt="eye"
                                    onClick={showPassword}
                                />
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={savePassword}
                        className="flex justify-center items-center hover:bg-green-500 bg-green-400 rounded-full px-8 py-2 w-fit mx-auto border-[1px] border-green-900"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        ></lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords ">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10 min-h-full">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='md:py-2 py-0 border border-white text-center  text-[2.5vw] sm:text-base'>
                                        <div className='flex items-center justify-center max-[645px]:flex-col flex-row'>
                                            <a href={item.site} target='_blank'>{item.Site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer ' onClick={() => { copyText(item.Site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='md:py-2 py-0 border border-white text-center  text-[2.5vw] sm:text-base'>
                                        <div className='flex items-center justify-center max-[645px]:flex-col flex-row'>
                                            <span>{item.Username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer ' onClick={() => { copyText(item.Username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='md:py-2 py-0 border border-white text-center  text-[2.5vw] sm:text-base'>
                                        <div className='flex items-center justify-center max-[645px]:flex-col flex-row'>
                                            <span>{".".repeat(item.Password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer ' onClick={() => { copyText(item.Password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"

                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>

                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px", }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>

                            })}

                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    );
};

export default Manager;
