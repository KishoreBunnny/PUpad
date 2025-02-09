import { NavLink, Outlet, useParams } from "react-router-dom";
export default function Home() {
   const {code}=useParams();
    return (
        <>
        <div className="h-[100vh] w-[100vw] bg-zinc-700 flex justify-center flex-col algin">
            <h1 className="lg:text-3xl font-extrabold mb-5 text-zinc-300">Your code found these existing notes.</h1>
            <div className=" h-[90%] lg:w-[80%] w-full   mb-4 lg:px-10 lg:py-5 bg-zinc-600 rounded-xl">
                <nav className="flex algin gap-5 p-2 bg-zinc-800 rounded-t-xl">
                    <NavLink
                        to={`read/${code}`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-neutral-700 rounded-[10px] p-2 text-white cursor-pointer"
                                : "text-zinc-300 p-2 cursor-pointer opacity-.8"
                        }
                    >
                        <h2>Read Mode</h2>
                    </NavLink>
                    <NavLink
                        to={`edit/${code}`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-neutral-700 rounded-[10px] p-2 text-white cursor-pointer "
                                : "text-zinc-300 p-2 cursor-pointer opacity-.8"
                        }
                    >
                        <h2>Edit Mode</h2>
                    </NavLink>
                </nav>
                <Outlet />
            </div>
        </div>
        <div className="bg-zinc-900 text-zinc-300 text-center font-bold"><p>A Mohan Reddy Production</p></div>
        </>
    )
}