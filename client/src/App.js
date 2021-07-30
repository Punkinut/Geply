import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import LetsGo from './pages/LetsGo'
import SignUp from './pages/SignUp'
import Login from './pages/Login';
import './styles/reset.css'
import './styles/style.css'

function App() {
    return (
        <Router>
            <>
            <Fade>
                <AnimatePresence>
                    <Switch>
                        <Route exact path='/welcome' component={LetsGo} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/signup' component={SignUp} />
                    </Switch> 
                </AnimatePresence>
            
            </Fade>
            </>
        </Router>
        
    )
}

export default App
