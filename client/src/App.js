import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import LetsGo from './pages/LetsGo'
import SignUp from './pages/SignUp'
import Login from './pages/Login';
import User from './pages/User';
import Home from './pages/Home';
import './styles/reset.css'
import './styles/style.css'
import MobileNav from './components/Nav/MobileNav';
import DesktopNav from './components/Nav/DesktopNav';
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Bio from './pages/Bio';


const httpLink = createHttpLink({
    uri: '/graphql',
  });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <>
                <AnimatePresence>
                  <>    
                        <DesktopNav/>
                        <MobileNav/>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/friends' component={Friends} />
                            <Route exact path='/profile' component={Profile} />
                            <Route exact path='/profile/:id' component={User} />
                            <Route exact path='/edit' component={EditProfile} />
                            <Route exact path='/bio' component={Bio} />
                            <Route exact path='/welcome' component={LetsGo} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/signup' component={SignUp} />
                        </Switch> 
                  </>
                </AnimatePresence>
                </>
            </Router>
        </ApolloProvider>
    )
}

export default App
