import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import {Homepage} from "./components/home/Homepage";
import {RegisterPage} from './components/RegisterPage';
// import {Homepage} from "./components/home/Homepage";
import { CreateDeckForm } from './components/CreateDeckForm/CreateDeckForm'

function App() {
    return (
        <div>
            <Switch>
                <Route exact path={"/"}>
                    <Homepage/>
                </Route>
                <Route path="/decks/create">
                  <CreateDeckForm />
                <Route path={"/register"}>
                    <RegisterPage/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
