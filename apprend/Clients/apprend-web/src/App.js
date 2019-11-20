import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import {Flashcards} from "./components/flashcards/add-flashcards";
// import {Homepage} from "./components/home/Homepage";

function App() {
    return (
        <div>
            <Switch>
                <Route exact path={"/"}>
                    {/*<Homepage/>*/}
                </Route>
                <Route exact path={"/add-flashcard"}>
                    <Flashcards/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
