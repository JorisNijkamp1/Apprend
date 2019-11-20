import React from 'react';
import {Homepage} from "./components/home/Homepage"
import './App.css';
import {Switch, Route} from 'react-router-dom'

function App() {
    return (
        <div>
            <Switch>
                <Route exact path={"/"}>
                    <Homepage/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
