import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

export default  function Edit(){
    const [text,setText]=useState('')
    const navigate = useNavigate();
    const { code} = useParams();
    useEffect(()=>{
        const Fetching= async ()=>{
            try{
                const response= await axios.get(`https://pupad.onrender.com/api/read/${code}`)
                setText(response.data)
            } 
            catch(err){
                toast.error(err.message || 'error occurred' , {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    toastClassName: 'bg-zinc-600 text-white', 
                    progressClassName: 'bg-zinc-900',
                });
                console.log('error',err)
            }
        }
        Fetching();
    },[]);

    const HandleSave=async ()=>{
    try {
        await  axios.put(`https://pupad.onrender.com/api/edit/${code}`,{code,text}) 
        toast.success('Saved successfully!', {
          position: "bottom-right",  
          autoClose: 2000,  
          hideProgressBar: false,  
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light"
      });
    } catch (error) {
        toast.error(error.message || 'error occurred' , {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            toastClassName: 'bg-zinc-600 text-white', 
            progressClassName: 'bg-zinc-900',
        });
        
    }
      //  //api/edit/:codeId'
       
    }

    const HandleText=(e)=>{
        setText(e.target.value)
    }

    const HandleClose=()=>{
       navigate('/')
    }
    const HandleSaveAndClose= async ()=>{
        try {
            await  axios.put(`https://pupad.onrender.com/api/edit/${code}`,{code,text})
        navigate('/')
        } catch (error) {
            toast.error(error.message || 'error occurred' , {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                toastClassName: 'bg-zinc-600 text-white', 
                progressClassName: 'bg-zinc-900',
            });
        }
     }
    const HandleRefresh=()=>{
        toast.success('Refreshed successfully!', {
            position: "bottom-right",  
            autoClose: 2000,  
            hideProgressBar: true,  
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
    }
     
    return(
    <>
        <div className=" h-144 mb-3 bg-zinc-700 text-2xl lg:px-10 px-2 rounded-b-xl text-zinc-300 ">
            <div className=" w-[100%] h-[99%] bg-zinc-600 ">
                <textarea 
                 value={ text }
                onChange={HandleText}
                name="" id="" placeholder="Write Your Notes Here" className="w-full h-full border-amber-300 bg-zinc-300 p-2 text-zinc-700">
                </textarea>
            </div>
        </div>  


        <div className="lg:w-full lg:h-10 h-6 lg:gap-20 p-6 gap-3 flex justify-center algin  bg-zinc-300 rounded-xl">
                    <button className="bg-neutral-700 rounded-[10px] p-2 text-white cursor-pointer hover:bg-neutral-600"
                    onClick={HandleSave}
                    >Save</button>
                    <button className="bg-neutral-700 rounded-[10px] p-2 text-white cursor-pointer  hover:bg-neutral-600"
                    onClick={HandleSaveAndClose}
                    >Save & Close</button>
                    <button className="bg-neutral-700 rounded-[10px] p-2 text-white cursor-pointer  hover:bg-neutral-600"
                    onClick={HandleRefresh}
                    >Refresh</button>
                    <button className="bg-neutral-700 rounded-[10px] p-2 text-white cursor-pointer  hover:bg-neutral-600"
                    onClick={HandleClose}
                    >Close</button>
        </div>   
        <ToastContainer  />  
    </>
    )
}