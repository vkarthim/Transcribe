import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AvatarEdit from './components/AvatarEdit';
import MainLayout from './components/MainLayout'
import NewOrBrowseParatextProjects from './components/NewOrBrowseParatextProject';
import SearchParatextProjects from './components/SearchParatextProjects';
import SelectProject from './components/SelectProject'
import UiLang from './components/UiLang'
import UserLogin from './components/UserLogin'
import UserSettings from './components/UserSettings';
import './index.sass';
import registerServiceWorker from './registerServiceWorker';
import store from "./store"

// https://reacttraining.com/react-router/web/example/basic
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact={true} path="/" component={UserLogin}/>
        <Route path="/project" component={SelectProject} />
        <Route path="/main" component={MainLayout} />
        <Route path="/settings" component={UserSettings}/>
        <Route path="/avatar" component={AvatarEdit} />
        <Route exact={true} path="/uilang" component={UiLang} />
        <Route path="/SearchParatextProjects" component={SearchParatextProjects} />
        <Route path="/NewOrBrowseParatextProjects" component={NewOrBrowseParatextProjects} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
