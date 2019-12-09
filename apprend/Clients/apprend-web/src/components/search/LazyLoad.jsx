import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import {API_URL} from "../../redux-store/urls";

const InfiniteScrollResults = (props) => {
        const [decks, setDecks] = useState([]);
        const [totalResults, setTotalResults] = useState(0);
        const [currentPage, setCurrentPage] = useState(1);
        const [hasMore, setHasMore] = useState(true);

        useEffect(() => {
            fetchDecks('', 0)
                .then(result => {
                    if (result.totalDecks) {
                        setTotalResults(result.totalDecks)
                    }
                    return result.decks
                })
                .then(decks => {
                    setDecks(decks)
                });
        }, []);

        async function fetchDecks(value, page) {
            const url = `${API_URL}/decks?deck=${value}&page=${page}`;

            const response = await fetch(url, {
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 200) {
                return await response.json()
            } else {
                console.log('Error: ' + response);
                return []
            }
        }

        const fetchMoreData = () => {
            if (decks.length >= totalResults) {
                setHasMore(false);
                return;
            }

            //increase (invisible) page
            setCurrentPage(currentPage + 1);

            setTimeout(() => {
                fetchDecks('', currentPage)
                    .then(result => {
                        let decksArray = decks.concat(result.decks);

                        //Filter potential duplicates
                        decksArray = decksArray.filter((v, i, a) => a.findIndex(t => (t.deckId === v.deckId)) === i)

                        setDecks(decksArray);
                    });
            }, 1000);
        };

        const searchResults = () => {
            if (decks && decks.length > 0) {
                return decks.map((deck, index) => {
                    if (deck) {
                        return (
                            <Col lg={{span: 6}} md={{span: 6}} key={deck.deckId + '-' + index}>
                                <Link to={`/decks/${deck.deckId}`} className={'deck-card-link'}>
                                    <Card className={'hover-shadow mb-4'}>
                                        <Card.Header className={'bg-blue text-white text-center'}><h2>{deck.name}</h2>
                                        </Card.Header>
                                        <Card.Body>
                                            <p className={'text-center'} style={{color: '#000'}}>
                                                {deck.description}
                                            </p>
                                            <strong>
                                                <Link id="creator" to={`/Aaron/decks`}>
                                                    <FontAwesomeIcon icon={faUser}
                                                                     size={'1x'}
                                                                     title={`Search`}
                                                                     color={'#000'}
                                                    />
                                                    <span style={{marginLeft: 5, color: '#000'}}>{deck.deckCreator}</span>
                                                </Link>
                                                <span className={'float-right'} style={{color: '#000'}}>
                                                    <span className={'font-weight-bold'}>Flashcards: {deck.totalFlashcards}</span>
                                                </span>
                                            </strong>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        )
                    }
                })
            }
        };

        return (
            <InfiniteScroll
                dataLength={decks.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4 style={{textAlign: "center"}}>Looking for more decks...</h4>}
                endMessage={
                    <p style={{textAlign: "center"}}>
                        <b>No more decks... 😥</b>
                    </p>
                }
            >
                <Row className={'mt-5'}>
                    {searchResults()}
                </Row>

            </InfiniteScroll>
        );
    }
;

export default InfiniteScrollResults
