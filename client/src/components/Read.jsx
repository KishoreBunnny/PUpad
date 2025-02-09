import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Read() {
    const { code } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState('');
    const [query, setQuery] = useState(''); 
    const [highlightedData, setHighlightedData] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8001/api/read/${code}`);
                setData(response.data); 
                setHighlightedData(response.data); 
            } catch (error) {
                toast.error(error.message || 'Error occurred', {
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
        fetchData();
    }, [code]);

    const handleRefresh = () => {
        toast.success('Refreshed successfully!', {
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
        setHighlightedData(data); 
    };

    const handleClose = () => {
        navigate('/');
    };
    const highlightText = (text, query) => {
        if (!query) return text; 
        const regex = new RegExp(`(${query})`, 'gi'); 
        return text.split(regex).map((part, index) =>
            regex.test(part) ? <span key={index} className="bg-amber-300 font-bold">{part}</span> : part
        );
    };
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setQuery(searchTerm);
        setHighlightedData(highlightText(data, searchTerm));
    };

    return (
        <>
            <div className="h-144 mb-3 bg-zinc-700 text-2xl lg:px-10 px-2 rounded-b-xl text-zinc-300">
                <div className="search-bar mb-1">
                    <input
                        type="text"
                        placeholder="Search For text"
                        value={query}
                        onChange={handleSearchChange}
                        className="p-2 w-full  rounded-md text-white bg-zinc-600 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                    />
                </div>

                <div className="w-full h-[90%] bg-zinc-200 overflow-auto p-4 text-zinc-400">
                    <pre className="whitespace-pre-wrap">{highlightedData}</pre>
                </div>
            </div>

            <div className="w-full h-12 flex gap-6 justify-center items-center p-4 bg-zinc-300 rounded-xl">
                <button
                    className="bg-neutral-700 rounded-[10px] p-2 text-white cursor-pointer hover:bg-neutral-600 focus:outline-none"
                    onClick={handleRefresh}
                >
                    Refresh
                </button>
                <button
                    className="bg-neutral-700 rounded-[10px] p-2 text-white cursor-pointer hover:bg-neutral-600 focus:outline-none"
                    onClick={handleClose}
                >
                    Close
                </button>
            </div>

            <ToastContainer />
        </>
    );
}
