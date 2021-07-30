import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LetsGo from './pages/LetsGo'
import SignUp from './pages/SignUp'
import './styles/reset.css'
import './styles/style.css'

function App() {
    return (
        <Router>
            <>
            <Switch>
                <Route exact path='/login' component={LetsGo} />
                <Route exact path='/signup' component={SignUp} />
            </Switch>   
            </>
        </Router>
        
    )
}

export default App
