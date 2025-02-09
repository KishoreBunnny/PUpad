import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import NoPage from "./components/NoPage";
import Home from "./components/Home";
import Edit from "./components/Edit";
import Read from "./components/Read";


function App() {

  return (
    <>
      <BrowserRouter>
      <div className="main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />}>
            <Route path={`edit/:code`} element={<Edit />} />
            <Route path={`read/:code`} element={<Read />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
       
      </div>
      </BrowserRouter>
     
        
    </>
  )
}

export default App
