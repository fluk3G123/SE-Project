import { BrowserRouter, Router } from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { useEffect } from 'react';

function App() {

  


  return (
    
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
    
  )
}

export default App
