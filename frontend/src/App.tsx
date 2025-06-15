import { useState } from 'react'
import { Routes, Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css'
import Operations from './Pages/Operations/operations';
import Management from './Pages/Management/management';
import Settings from './Pages/Settings/settings';
import Authenticate from './Pages/Authenticate/authenticate';

function App() {
  return  <Routes>
            <Route path="/" element={<Authenticate />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/management" element={<Management />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="/neworsetoperation" element={<NewOrSetOperation />}> */}
              {/* <Route path="/newfragments/:id" element={<NewFragments />} /> */}
            {/* </Route> */}
    </Routes>;
}

export default App
