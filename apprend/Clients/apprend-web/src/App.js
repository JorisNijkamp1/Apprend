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
import Search from './components/search/Search';
import {isLoggedIn} from './components/shared/actions/actions';
import Privacy from './components/privacy/Privacy';
import PrivacyPopUp from './components/privacy-pop-up/PrivacyPopUp';
import TagOverview from "./components/filter-tags/TagOverview";
import {MyProfile} from "./components/my-profile/MyProfile";

function App(props) {
    //Check if user is logged in
    useEffect(() => {
        props.isLoggedIn()
    }, []);

    return (
        <div>
            <Switch>
                <Route exact path={'/'}>
                    <PrivacyPopUp/>
                    <Homepage/>
                </Route>
                <Route path={'/privacy'}>
                    <Privacy/>
                </Route>
                <Route path="/decks/create">
                    <PrivacyPopUp/>
                    <CreateDeck/>
                </Route>
                <Route path={'/register'}>
                    <PrivacyPopUp/>
                    <RegisterPage/>
                </Route>
                <Route path={'/login'}>
                    <PrivacyPopUp/>
                    <LoginPage/>
                </Route>
                <Route path={'/profile/:userId'}>
                    <MyProfile/>
                </Route>
                <Route path={'/decks/:deckId/play'}>
                    <PrivacyPopUp/>
                    <PlayingDeck/>
                </Route>
                <Route path={'/decks/:deckId/score'}>
                    <PrivacyPopUp/>
                    <PlayingScore/>
                </Route>
                <Route path={'/decks/:deckId'}>
                    <PrivacyPopUp/>
                    <Deck/>
                </Route>
                <Route exact path={'/:username/decks'}>
                    <PrivacyPopUp/>
                    <UserDecks/>
                </Route>
                <Route path={'/search'}>
                    <PrivacyPopUp/>
                    <Search/>
                </Route>
                <Route exact path={'/tags/:tag'}>
                    <PrivacyPopUp/>
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
