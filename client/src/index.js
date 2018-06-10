import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import localforage from 'localforage';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";

import { store, persistor } from "./config/store";
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/login';
import Dashboard from './pages/dashboard';

// Configure global local storage
localforage.config({
    driver      : localforage.LOCALSTORAGE, // Force WebSQL; same as using setDriver()
    name        : 'recipesApp',
    version     : 1.0,
    // size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName   : 'userdata', // Should be alphanumeric, with underscores.
    description : 'Stores the user data'
});

class App extends Component {
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/login" component={Login} />
                </Switch>
            </Router>
        );
    }
};

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
            <App/>
        </PersistGate>
    </Provider>, 
    document.getElementById('root')
);