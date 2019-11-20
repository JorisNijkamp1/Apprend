import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import {Flashcards} from "./components/flashcards/add-flashcards";
// import {Homepage} from "./components/home/Homepage";
import { CreateDeckForm } from './components/CreateDeckForm/CreateDeckForm'

function App() {
    return (
        <div>
            <Switch>
                <Route exact path={"/"}>
                    {/*<Homepage/>*/}
                </Route>
                <Route path="/decks/create">
                  <CreateDeckForm />
                </Route>
                <Route exact path={"/decks/flashcards/add"}>
                    <Flashcards/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
