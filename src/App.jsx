import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './routes/Home'
import Users from './routes/Users';
function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
    <Routes>
       <Route path='/preview' Component={Home}/>
       <Route path='/users' Component={Users}/>
     </Routes>
   </Router>
  )
}

export default App
