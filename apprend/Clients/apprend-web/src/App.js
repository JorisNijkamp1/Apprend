import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import {RegisterPage} from './components/RegisterPage';
import {PlayingDeck} from './components/PlayingDeck';
// import {Homepage} from "./components/home/Homepage";

function App() {
    return (
        <div>
            <Switch>
                <Route exact path={"/"}>
                    {/*<Homepage/>*/}
                </Route>
                <Route path={"/register"}>
                    <RegisterPage/>
                </Route>
                <Route path={"/play"}>
                    <PlayingDeck/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
