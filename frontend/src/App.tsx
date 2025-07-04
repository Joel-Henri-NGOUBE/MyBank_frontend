import { useState } from 'react'
import { Routes, Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css'
import Operations from './Pages/Operations/operations';
import Management from './Pages/Management/management';
import Settings from './Pages/Settings/settings';
import Authenticate from './Pages/Authenticate/authenticate';
import NewOrSetOperation from './Pages/NewOrSetOperation/neworsetoperation';
import Statistics from './Pages/Statistics/statistics';

function App() {
  return  <Routes>
            <Route path="/" element={<Authenticate />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/management" element={<Management />} />
              {/* <Route path="/" element={<Management />} />
              <Route path="/track" element={<Operations />} />
              <Route path="/invest" element={<Operations />} />
              <Route path="/save" element={<Operations />} /> */}
            {/* </Route> */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/neworsetoperation" element={<NewOrSetOperation />}>
              <Route path="/neworsetoperation/:id" element={<NewOrSetOperation />} />
            </Route>
            <Route path="/statistics" element={<Statistics />} />
    </Routes>;
}

export default App
