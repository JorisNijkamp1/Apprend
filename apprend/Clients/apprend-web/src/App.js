import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {Switch, Route} from "react-router-dom"
import {Homepage} from "./components/home/Homepage";
import {RegisterPage} from "./components/RegisterPage";
import {CreateDeckForm} from "./components/CreateDeckForm/CreateDeckForm"
import Flashcards from "./components/flashcards/add-flashcards";
import {PlayingDeck} from "./components/playing/PlayingDeck";
import MyDeck from "./components/my-deck/MyDeck";

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
                <Route exact path={"/:username/decks"}>
                    <MyDeck/>
                </Route>
                <Route path={"/play"}>
                    <PlayingDeck/>
                </Route>
            </Switch>
        </div>
    )
}

export default App;
