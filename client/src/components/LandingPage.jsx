import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from 'react-icons/fa';

export default function LandingPage() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) {
      return toast.error('Enter Your Code', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: {
          color: '#a1a1aa',
          backgroundColor: '#1c1917'
        }
      });
    }
    setIsLoading(true)

    try {
      const res = await axios.post('https://pupad.onrender.com/api/code', { code })

      if (res.data.id === 'NoCode') {
        const createCode = await axios.post(`https://pupad.onrender.com/api/edit/${code}`)
        navigate(`/home/edit/${createCode.data.id}`);
      }
      else {
        navigate(`/home/edit/${res.data.id}`);
        setCode('')
      }
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: {
          color: '#a1a1aa',
          backgroundColor: '#1c1917'
        }
      });
    }
    finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="h-[100vh] w-[100vw] bg-zinc-600 flex justify-center algin flex-col">
        <h1 className="lg:text-5xl text-3xl font-extrabold text-zinc-200 mb-5">The fastest way to save notes anywhere</h1>
        <h2 className="text-xl font-bold text-zinc-300">No accounts. No signups. No installs. Just choose one code.</h2>
        <div className="bg-zinc-800  lg:p-10 p-2 text-zinc-300 flex flex-col justify-center algin rounded-2xl mt-5 ">
          <h3 className="text-l font-bold text-zinc-100 mb-10">Let's try. Enter a new or used code now to open, encrypt and save notes with.</h3>
          <div className="mb-5">
            <form onSubmit={handleSubmit}  >
              <input name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="password"
                disabled={isLoading}
                placeholder="Enter Your Code" className="w-60 p-2 m-3 outline font-medium text-l rounded" />
              <button className="p-2 m-3 lg:m-0 cursor-pointer bg-zinc-800 border-1  border-zinc-50 rounded hover:bg-zinc-700"
                type="submit"
                disabled={isLoading}>
                {isLoading ? (
                  <FaSpinner className="animate-spin text-zinc-200" />
                ) : (
                  'Open'
                )}
              </button>
            </form>
          </div>
          <p className="mb-1 text-zinc-300">It's that simple!</p>
          <p className="text-zinc-500 ">For example, you can use whati'mhavingfordinnertonight33344456</p>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}