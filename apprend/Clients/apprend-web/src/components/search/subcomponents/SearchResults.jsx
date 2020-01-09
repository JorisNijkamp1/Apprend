import React, {useEffect, useState} from "react";
import * as ReactRedux from 'react-redux'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {getSearchSuggestions, setIsLoading, setSearchValue} from "../../shared/actions/actions";
import {useHistory} from "react-router";

const SearchResults = (props) => {
    const [results, setResults] = useState([]);
    const [typeResults, setTypeResults] = useState('decks');
    const urlParams = new URLSearchParams(window.location.search);
    let searchValue = (props.searchValue === null) ? (urlParams.get('q') === 'null') ? '' : urlParams.get('q') : props.searchValue;

    let history = useHistory()
    useEffect(() => {
        props.getSearchSuggestions(searchValue, false)
            .then(data => {
                setResults(data);
                setTypeResults(data[1].results.length === 0 ? 'users' : 'decks')
                history.push(`/search?q=${searchValue}`)
            })
    }, [props.searchValue]);

    const noResultsFound = () => {
        if (!props.isLoading) return (
            <h3 className={'text-center w-100 pt-5'}>
                No {typeResults} found... 😭
            </h3>
        )
    };

    const deckResults = () => {
        if (results.length > 0 && results[1].results.length > 0 && typeResults === 'decks') {
            return results[1].results.map((deck) => (
                    <section className="search-result-item" key={deck._id}>
                        <a className="image-link" href={`/decks/${deck._id}`}>
                            <img className="image"
                                 src={`https://via.placeholder.com/200/00B5FB/FFFFFF?text=${deck.flashcards} cards`}/>
                        </a>
                        <div className="search-result-item-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4 className="search-result-item-heading">
                                        <a href={`/decks/${deck._id}`}>{deck.name}</a>
                                    </h4>
                                    <p className="info">{deck.flashcards} flashcards</p>
                                    <p className="description w-100">
                                        {deck.description}
                                    </p>
                                    <a className="btn btn-primary btn-info btn-sm" href={`/decks/${deck._id}`}>View deck</a>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            )
        } else if (results.length > 0 && results[1].results.length === 0 && typeResults === 'decks') {
            return noResultsFound()
        }
    };

    const userResults = () => {
        if (results.length > 0 && results[0].results.length > 0 && typeResults === 'users') {
            return results[0].results.map((user) => {
                    const event = new Date(user.signupDate);
                    const options = {year: 'numeric', month: 'long', day: 'numeric'};
                    return (
                        <section className="search-result-item" key={user.name}>
                            <a className="image-link" href={`/${user.name}/decks`}>
                                <img className="image" src={`https://api.adorable.io/avatars/200/${user.name}`}/>
                            </a>
                            <div className="search-result-item-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h4 className="search-result-item-heading ">
                                            <a href={`/${user.name}/decks`}>{user.name}</a>
                                        </h4>
                                        <p className="info">{user.decks} decks</p>
                                        <p className="description w-100" style={{height: 40}}>
                                            User account created on <i>{event.toLocaleDateString('en-EN', options)}</i>
                                        </p>
                                        <a className="btn btn-primary btn-info btn-sm" href={`/${user.name}/decks`}>View
                                            profile</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                }
            )
        } else if (results.length > 0 && results[0].results.length === 0 && typeResults === 'users') {
            return noResultsFound()
        }
    };

    const filterMenu = () => (
        <Col md={{span: 4}}>
            <h4>Results <span className="fw-semi-bold">Filtering</span></h4>
            <p className="text-muted fs-mini">Listed content is categorized by the following groups:</p>
            <div className="nav flex-column nav-pills">
                <a className={`nav-link pointer ${(typeResults === 'decks') ? 'active' : ''}`}
                   onClick={() => setTypeResults('decks')}>
                    Decks
                    <span className="badge badge-light badge-pill float-right">
                        {results.length > 0 ? results[1].results.length : 0}
                    </span>
                </a>
                <a className={`nav-link pointer ${(typeResults === 'users') ? 'active' : ''}`}
                   onClick={() => setTypeResults('users')}>
                    Users
                    <span className="badge badge-primary badge-pill float-right">
                        {results.length > 0 ? results[0].results.length : 0}
                    </span>
                </a>
            </div>
        </Col>
    );

    const searchResults = () => (
        <>
            {filterMenu()}
            <div className="col-md-8">
                <p className="search-results-count">
                    About {(results.length > 0) ? (results[0].results.length + results[1].results.length) : 0} results
                    for {searchValue}
                </p>
                {userResults()}
                {deckResults()}
            </div>
        </>
    );

    return (
        <>
            <Row className={'pt-4'}>
                {searchResults()}
            </Row>
        </>
    );
};

const mapStateToProps = state => {
    return {
        isLoading: state.search.isLoading,
        searchValue: state.search.searchValue,
        searchSuggestions: state.search.searchSuggestions
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setSearchValue: (searchValue) => dispatch(setSearchValue(searchValue)),
        getSearchSuggestions: (searchValue, autoSuggest) => dispatch(getSearchSuggestions(searchValue, autoSuggest)),
        setIsLoading: (bool) => dispatch(setIsLoading(bool))
    }
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchResults);
