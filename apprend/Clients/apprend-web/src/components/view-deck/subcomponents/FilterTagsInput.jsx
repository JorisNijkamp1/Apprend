import React, {useState} from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Col, InputGroup, Row, Button, Form} from "react-bootstrap";
import {deleteFilteredTag, setFilteredTag, setFilteredDecks, clearFilteredTags, loadDecks} from '../../shared/actions/actions';
import {Notification} from '../../shared/components/Notification';
import { useEffect } from "react";

/* ----------- */
/*    Utils    */
/* ----------- */

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/* --------------- */
/*    Component    */
/* --------------- */

const FilterTagsInput = (props) => {
    const [value, setValue] = useState('');
    const [decks, setDecks] = useState([]);
    const [displayTags, setDisplayTags] = useState([]);

    useEffect(() => {
        props.clearFilteredTags([]);
    }, []);

    const getAllTags = async decks => {
        const tags = [];
        decks.forEach(deck => {
            deck.tags.forEach(tag => {
                tags.push(tag);
            })
        })
        const filteredTags = tags.filter((deck, index) => {
            return index === tags.findIndex(filter => {
                return filter === deck;
            });
        });
        return filteredTags
    }

    const loadDecks = async () => {
        let response = await props.loadDecks(props.username);
        await setDecks(response.decks);
        return response.decks
    }

    const checkAdded = tagValue => {
        return props.filteredTags.some(tag => {
            return tag === tagValue.trim().toLowerCase();
        });
    }

    const getMatchingDecks = tag => {
        let tags;
        if (tag.add !== undefined) {
            tags = props.filteredTags.concat(tag.add)
        } else if (tag.delete !== undefined) {
            tags = props.filteredTags.filter((value, index, arr) => {
                return value !== tag.delete;
            });
        }

        if (tags.length === 0) return []

        const filteredDecks = [];
        decks.forEach(deck => {
            if (arrayContainsArray(deck, tags) === true) {
                filteredDecks.push(deck)
            }
        })

        if (filteredDecks.length === 0) {
            props.setFilteredDecks("There are no decks with this tag!");
            filteredDecks.push("There are no decks with this tag!")
            return filteredDecks;
        } else {
            props.setFilteredDecks(filteredDecks);
            return (filteredDecks.length > 4) ? filteredDecks.slice(0, 4) : filteredDecks;
        }
    };

    const arrayContainsArray = (superset, subset) => {
        if (0 === subset.length) {
            return false;
        }
        return subset.every(function (value) {
            return (superset.tags.includes(value.toString()));
        });
    }

    const renderSuggestions = async value => {
        setValue(value);
        let suggestions = await loadDecks();
        const regex = new RegExp('^' + value, 'i');
        let tags = await getAllTags(suggestions);
        const match = [];
        tags.forEach(tag => {
            if (regex.test(tag)) {
                match.push(tag);
            }
        })
        if (value.length !== 0) {
            if (match.length !== 0) {
                await setDisplayTags(match);
            } else {
                await setDisplayTags(["There are no decks with this tag!"]);
            }
        } else {
            setDisplayTags([]);
        }
    }

    const AddFilteredTag = () => {
        const escapedValue = escapeRegexCharacters(value.trim().toLowerCase());
        setValue('');
        setDisplayTags([]);
        if (escapedValue !== "") {
            if (checkAdded(escapedValue)) {
                Notification("You already have that tag filter", "danger");
            } else {
                props.setFilteredTag(value);
                getMatchingDecks({add: value});
            }
        } else {
            Notification("You can't add an empty tag filter", "danger");
        }
    }

    const DeleteFilteredTag = tag => {
        props.setFilteredDecks(decks);
        props.deleteFilteredTag(tag);
        getMatchingDecks({delete: tag});
    }

    return (
        <>
            <Row>
                <Col md={{span: 10, offset: 1}}>
                    <Row>
                        <Col xs={{span: 8}} md={{span: 8, offset: 1}} lg={{span: 6, offset: 3}}>
                            <InputGroup className="mb-3 pt-2">
                                <Form.Control
                                    placeholder={'Filter on tags'}
                                    type={'text'}
                                    className={'form-control'}
                                    id={'Filter'}
                                    value={value}
                                    onChange={e => renderSuggestions(e.target.value)}
                                    autocomplete='off'
                                />
                                <InputGroup.Append>
                                    <Button className={'bg-blue text-white hover-shadow'} onClick={() => AddFilteredTag()}>
                                        <span className={'ml-1'}>Add filter</span>
                                    </Button>
                                </InputGroup.Append>
                                {displayTags.length > 0 ?
                                    <InputGroup className="mb-3 filterList">
                                        {displayTags.map(tag =>
                                            <Link key={tag} to={`/tags/${tag}`} className={'search-suggestions-link filterTags'}>
                                                <span style={{fontWeight: 600}}>{tag}</span>
                                            </Link>
                                        )}
                                    </InputGroup>
                                : ""}
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <ul>
                            {props.filteredTags.map((tag) => <li key={tag} className="listItem">
                                {tag}
                                <i id='deleteFilteredTag' className='fa fa-times tagButton' onClick={() => DeleteFilteredTag(tag)}/>
                            </li>)}
                        </ul>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = state => {
    return {
        filteredDecks: state.decks.filteredDecks,
        filteredTags: state.filter.filteredTags
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setFilteredDecks: (decks) => dispatch(setFilteredDecks(decks)),
        setFilteredTag: (tags) => dispatch(setFilteredTag(tags)),
        deleteFilteredTag: (tag) => dispatch(deleteFilteredTag(tag)),
        clearFilteredTags: () => dispatch(clearFilteredTags()),
        loadDecks: (username) => dispatch(loadDecks(username))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterTagsInput);