import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import {Homepage} from './components/home/Homepage';
import {RegisterPage} from './components/register/RegisterPage';
import {CreateDeck} from './components/create-deck/CreateDeck'
import {PlayingDeck} from './components/playing/PlayingDeck';
import {LoginPage} from './components/login/LoginPage';
import UserDecks from './components/view-user-decks/UserDecks';
import Deck from './components/view-deck/Deck';
import {PlayingScore} from './components/playing/subcomponents/PlayingScore';
import * as ReactRedux from 'react-redux';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.css'
import Search from './components/search-deck/Search';
import {SearchUser} from './components/search-user/SearchUser';
import {isLoggedIn} from './components/shared/actions/actions';
import TagOverview from "./components/filter-tags/TagOverview";

function App(props) {
    //Check if user is logged in
    useEffect(() => {
        props.isLoggedIn()
    }, []);

    return (
        <div>
            <Switch>
                <Route exact path={'/'}>
                    <Homepage/>
                </Route>
                <Route path="/decks/create">
                    <CreateDeck/>
                </Route>
                <Route path={'/register'}>
                    <RegisterPage/>
                </Route>
                <Route path={'/login'}>
                    <LoginPage/>
                </Route>
                <Route path={'/decks/:deckId/play'}>
                    <PlayingDeck/>
                </Route>
                <Route path={'/decks/:deckId/score'}>
                    <PlayingScore/>
                </Route>
                <Route path={'/decks/:deckId'}>
                    <Deck/>
                </Route>
                <Route exact path={'/:username/decks'}>
                    <UserDecks/>
                </Route>
                <Route path={'/search'}>
                    <Search/>
                </Route>
                <Route path={'/users'}>
                    <SearchUser/>
                </Route>
                <Route exact path={"/tags/:tag"}>
                    <TagOverview/>
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
