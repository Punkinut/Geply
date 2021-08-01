import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Fade from 'react-reveal/Fade';
import LetsGo from './pages/LetsGo'
import SignUp from './pages/SignUp'
import Login from './pages/Login';
import Home from './pages/Home';
import './styles/reset.css'
import './styles/style.css'
import MobileNav from './components/Nav/MobileNav';


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
                <Fade>
                        <MobileNav/>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/welcome' component={LetsGo} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/signup' component={SignUp} />
                        </Switch> 
                </Fade>
                </AnimatePresence>
                </>
            </Router>
        </ApolloProvider>
    )
}

export default App
