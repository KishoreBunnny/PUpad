import { useNavigate } from "react-router-dom"
export default  function NoPage(){
    const nav=useNavigate();
   const  Handle=()=>{
        nav('/')
    }
    return(
        <div className="h-[100vh]   w-[100vw] flex algin justify-center flex-col bg-zinc-700 text-2xl text-zinc-300 ">
            <h1 className="text-4xl mt-70 font-extrabold text-center">No Page Found</h1>
            <button className="p-2 m-3 cursor-pointer bg-zinc-800 border-1  border-zinc-50 rounded-xl hover:bg-zinc-700"
            onClick={Handle}
            >Go To Home Page</button>
            <p className="mt-100 text-center font-bold text-sm ">
                Ask Mohan For This
            </p>
        </div>  
    )
}