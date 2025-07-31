import { Routes, Route } from "react-router-dom";
import './App.css'
import Operations from './Pages/Operations/operations';
import Management from './Pages/Management/management';
import Authenticate from './Pages/Authenticate/authenticate';
import NewOrSetOperation from './Pages/NewOrSetOperation/neworsetoperation';
import Statistics from './Pages/Statistics/statistics';

function App() {
  return  <Routes>
            <Route path="/" element={<Authenticate />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/management" element={<Management />} />
            <Route path="/neworsetoperation" element={<NewOrSetOperation />}>
              <Route path="/neworsetoperation/:id" element={<NewOrSetOperation />} />
            </Route>
            <Route path="/statistics" element={<Statistics />} />
    </Routes>;
}

export default App
