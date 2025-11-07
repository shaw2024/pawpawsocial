import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavBar from './components/NavBar';
import useAuth from './hooks/useAuth';

const App: React.FC = () => {
  // fetch current user on app mount
  const { fetchMe } = useAuth();
  React.useEffect(() => {
    fetchMe && fetchMe();
  }, [fetchMe]);

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
};

export default App;