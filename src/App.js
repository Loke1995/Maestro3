import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import Tour from "reactour";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/Pages/Login"));
const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));

class App extends Component {
  constructor() {
    super();
    this.state = {
      isTourOpen: false
    };
  }

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

  render() {
    return (
      <HashRouter>
        <button onClick={this.openTour}>Start Tour</button>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={props => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={props => <Register {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={props => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={props => <Page500 {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={props => <DefaultLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
        <Tour
          steps={tourConfig}
          isOpen={this.state.isTourOpen}
          onRequestClose={this.closeTour}
        />
      </HashRouter>
    );
  }
}

export default App;

const tourConfig = [
  {
    selector: '[data-tut="tour-category"]',
    content: `tour-category`
  },
  {
    selector: '[data-tut="tour-card-6"]',
    content: `data-tut="tour-card-6"`
  },
  {
    selector: '[data-tut="tour-card-9"]',
    content: `data-tut="tour-card-9"`
  }
];
