import React, {useState, useCallback} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Users from './user/pages/Users';
import NewNotes from './lessons/pages/NewNotes';
import UserLessons from './lessons/pages/UserLessons';
import UpdateNotes from './lessons/pages/UpdateNotes';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import {AuthContext} from './shared/context/auth-context';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState (false);

  const login = useCallback (() => {
    setIsLoggedIn (true);
  }, []);

  const logout = useCallback (() => {
    setIsLoggedIn (false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes=(
      <Switch>
        <Route exact path="/">
          <Users />
        </Route>
        <Route path="/:userId/lessons" exact>
          <UserLessons />
        </Route>
        <Route exact path="/lessons/new">
              <NewNotes />
            </Route>
            <Route path="/lessons/:lessonId">
              <UpdateNotes />
            </Route>
        <Redirect to='/'/>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/">
          <Users />
        </Route>
        <Route path="/:userId/lessons" exact>
          <UserLessons />
        </Route>
        <Route path="/auth">
              <Auth />
        </Route>
        <Redirect to='/auth'/>
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>   
            {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
