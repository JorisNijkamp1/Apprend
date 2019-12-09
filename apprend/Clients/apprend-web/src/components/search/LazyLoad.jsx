import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

class InfiniteScrollResults extends React.Component {
    state = {
        items: Array.from({length: 5}),
        hasMore: true
    };

    fetchMoreData = () => {
        if (this.state.items.length >= 100) {
            this.setState({hasMore: false});
            return;
        }
        // a fake async api call like which sends
        // 20 more records in .5 secs
        setTimeout(() => {
            this.setState({
                items: this.state.items.concat(Array.from({length: 5}))
            });
        }, 1000);
    };

    render() {
        return (
            <InfiniteScroll
                dataLength={this.state.items.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={<h4>Looking for decks...</h4>}
                endMessage={
                    <p style={{textAlign: "center"}}>
                        <b>No more decks... 😥</b>
                    </p>
                }
            >
                <Row className={'mt-5'}>
                    {this.state.items.map((i, index) => (
                        <Col lg={{span: 6}} md={{span: 6}}>
                            <Link to={`/decks/1`} className={'deck-card-link'}>
                                <Card className={'hover-shadow mb-4'}>
                                    <Card.Header className={'bg-blue text-white text-center'}><h2>Deck #{index}</h2>
                                    </Card.Header>
                                    <Card.Body>
                                        <p className={'text-center'} style={{color: '#000'}}>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, similique.
                                        </p>
                                        <strong>
                                            <Link id="creator" to={`/Aaron/decks`}>
                                                <FontAwesomeIcon icon={faUser}
                                                                 size={'1x'}
                                                                 title={`Search`}
                                                                 color={'#000'}
                                                />
                                                <span style={{marginLeft: 5, color: '#000'}}>Aaron</span>
                                            </Link>
                                        </strong>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>

            </InfiniteScroll>
        );
    }
}

export default InfiniteScrollResults
