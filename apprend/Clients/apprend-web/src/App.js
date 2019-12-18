import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import {Homepage} from "./components/home/Homepage";
import {RegisterPage} from './components/register/RegisterPage';
import {CreateDeckForm} from './components/CreateDeckForm/CreateDeckForm'
import Flashcards from "./components/flashcards/add-flashcards";
import {PlayingDeck} from "./components/playing/PlayingDeck";
import {LoginPage} from "./components/LoginPage";
import UserDecks from "./components/user-decks/UserDecks";
import Deck from "./components/user-decks/Deck";
import {PlayingScore} from "./components/playing/sub-components/PlayingScore";
import {isLoggedIn} from "./redux-store/actions/login/async-actions";
import * as ReactRedux from "react-redux";
import {DeckEdit} from "./components/user-decks/edit-deck/DeckEdit";
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.css'
import Search from "./components/search/Search";
import {SearchUser} from './components/search-user/SearchUser';
import {MyProfile} from "./components/my-profile/MyProfile";

function App(props) {

    //Check if user is logged in
    useEffect(() => {
        props.isLoggedIn()
    }, []);

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
                <Route path={"/login"}>
                    <LoginPage/>
                </Route>
                <Route exact path={"/decks/:deckId/flashcards"}>
                    <Flashcards/>
                </Route>
                <Route path={"/decks/:deckId/play"}>
                    <PlayingDeck/>
                </Route>
                <Route path={"/decks/:deckId/score"}>
                    <PlayingScore/>
                </Route>
                <Route exact path={"/decks/:deckId/edit"}>
                    <DeckEdit/>
                </Route>
                <Route path={"/decks/:deckId"}>
                    <Deck/>
                </Route>
                <Route exact path={"/:username/decks"}>
                    <UserDecks/>
                </Route>
                <Route path={"/search"}>
                    <Search/>
                </Route>
                <Route path={"/users"}>
                    <SearchUser/>
                </Route>
                <Route path={"/profile/:username"}>
                    <MyProfile/>
                </Route>
                <Route>
                    <Homepage/>
                </Route>
            </Switch>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        //
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isLoggedIn: () => dispatch(isLoggedIn()),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
