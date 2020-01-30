import React from 'react';
import { HashRouter,Route, Switch } from 'react-router-dom';
import MainPage from './projects/Tech-Pack/mainPage.jsx'
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const ubbuName="/ubbu/"
const  App=props=> {
  return (
       <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route path={ubbuName+"techPack"} exact={true} name="home" render={props => <MainPage {...props}/>} />
            </Switch>
          </React.Suspense>
        </HashRouter> 
  );
}

export default App;
