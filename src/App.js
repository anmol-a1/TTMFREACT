// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';
import Alert from './components/Alert';
import Start from './components/Start';
import Usershomepage from './components/Usershomepage';
function App() {
  const [alert, setalert] = useState(null);
  const showalert=(message,type)=>{
     setalert({
       msg:message,
       type:type
     })
     setTimeout(() => {
       setalert(null);
     }, 3000);

  }
  return (
   <>
   <Alert alert={alert} />
    <Router>
    <Routes>

    <Route exact path="/userhomepage"  element={<Usershomepage showalert={showalert} />}/>
    <Route exact path="/"   element={<Start showalert={showalert} />}/>
    </Routes>
    </Router>
   </>
  );
}

export default App;
