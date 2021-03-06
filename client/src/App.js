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
import AddPost from './components/Nav/AddPost';
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Bio from './pages/Bio';
import Following from './pages/Following';
import Upload from './pages/Upload';
import Comments from './pages/Comments';
import Posts from './pages/Posts';
import MainChat from './pages/MainChat';
import Message from './pages/Message';
import ScrollToTop from './components/Tools/ScrollToTop';


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
    cache: new InMemoryCache({
      typePolicies: {
        User: {
          fields: {
            following: {
              merge(existing, incoming){
                return incoming
              }
            },
            followers: {
              merge(existing, incoming){
                return incoming
              }
            },
          },
        },
        Post: {
          fields: {
            likes: {
              merge(existing, incoming){
                return incoming
              }
            },
          },
        },
      },
    }),
  });

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <>
                <AnimatePresence>
                  <>    
                        <AddPost/>
                        <DesktopNav/>
                        <MobileNav/>
                        <Switch>
                            <ScrollToTop>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/friends' component={Friends} />
                            <Route exact path='/chat' component={MainChat} />
                            <Route exact path='/message/:id' component={Message} />
                            <Route exact path='/profile' component={Profile} />
                            <Route exact path='/upload' component={Upload} />
                            <Route exact path='/following' component={Following} />
                            <Route exact path='/profile/:id' component={User} />
                            <Route exact path='/posts/:id' component={Posts} />
                            <Route exact path='/comments/:id' component={Comments} />
                            <Route exact path='/edit' component={EditProfile} />
                            <Route exact path='/bio' component={Bio} />
                            <Route exact path='/welcome' component={LetsGo} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/signup' component={SignUp} />
                            </ScrollToTop>
                        </Switch> 
                  </>
                </AnimatePresence>
                </>
            </Router>
        </ApolloProvider>
    )
}

export default App
