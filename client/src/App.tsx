import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter, withRouter, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { configureStore, actionCreators, IApplicationState } from './store/_configure';
import { bindActionCreators } from 'redux';
import Layout from './components/Layout';
import Home from './components/Home';
import ArtworkDetail from './components/ArtworkDetail';
import * as UserStore from './store/UserStore';
import * as ArtworkStore from './store/ArtworkStore';

type RouteProps = 
  IApplicationState
  & typeof UserStore.actionCreators
  & typeof ArtworkStore.actionCreators
  & RouteComponentProps<{}>;
const Routes: React.SFC<RouteProps> = (props) => {
  return (
    <Layout {...props}>
      <Switch>
        <Route exact path="/"><Home {...props} /></Route> 
        <Route exact path="/detail/:id"><ArtworkDetail {...props} /></Route>
      </Switch>
    </Layout>
  )
}

const ConnectedApp = withRouter(
  connect((state:IApplicationState) => state, 
    (dispatch: any) => bindActionCreators(actionCreators, dispatch)
  )(Routes) as any);

export default class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <BrowserRouter>
          <ConnectedApp />
        </BrowserRouter>
      </Provider>
    );
  }
};
