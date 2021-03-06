import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import setAuthToken from './utils/setAuthToken';

import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';

import {
  LOGIN_LINK,
  SIGNUP_LINK,
  SETTING_LINK,
  MESSAGE_LINK,
  FIND_USERS_LINK,
} from './components/routes/NavLinks';

import Navmenu from './components/layout/Navmenu';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import Setting from './components/settings/Settings';
import Messages from './components/profile/Messages';
import Find from './components/profile/Find';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Navmenu />
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path={SIGNUP_LINK} component={SignUp} />
            <Route exact path={LOGIN_LINK} component={Login} />
            <Route exact path={SETTING_LINK} component={Setting} />
            <Route exact path={MESSAGE_LINK} component={Messages} />
            <Route exact path={FIND_USERS_LINK} component={Find} />
            <Route exact path="/:userName" component={Profile} />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
};

export default App;
