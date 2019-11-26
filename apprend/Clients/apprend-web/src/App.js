import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import {Homepage} from "./components/home/Homepage";
import {RegisterPage} from './components/register/RegisterPage';
import {CreateDeckForm} from './components/CreateDeckForm/CreateDeckForm'
import Flashcards from "./components/flashcards/add-flashcards";
import UserDecks from "./components/user-decks/UserDecks";
import Deck from "./components/user-decks/Deck";


function App() {
    return (
        <div>
            <Switch>
                <Route exact path={"/"}>
                    <Homepage/>
                </Route>
                <Route path="/decks/create">
                    <CreateDeckForm/>
                </Route>
                <Route path={"/register"}>
                    <RegisterPage/>
                </Route>
                <Route exact path={"/decks/flashcards/add"}>
                    <Flashcards/>
                </Route>
                <Route exact path={"/decks/:deckId/flashcards"}>
                    <Flashcards/>
                </Route>
                <Route path={"/decks/:deckId"}>
                    <Deck/>
                </Route>
                <Route exact path={"/:username/decks"}>
                    <UserDecks/>
                </Route>
            </Switch>
        </div>
    )
}

export default App;
