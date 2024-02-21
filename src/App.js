import React from 'react'
import Login from './Component/Login.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LawyerSignup from './Component/LawyerSignUp.js'
import CustomerSignup from './Component/CustomerSignup.js'

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/'
            element={
              <div>
                <Login />
              </div>
            } />
            <Route path='/lawyer-signup'
              element={
                <div>
                  <LawyerSignup />
                </div>
              } />
              <Route path='/customer-signup'
              element={
                <div>
                  <CustomerSignup />
                </div>
              } />
        </Routes>
      </div>
    </Router>
  )
}

export default App