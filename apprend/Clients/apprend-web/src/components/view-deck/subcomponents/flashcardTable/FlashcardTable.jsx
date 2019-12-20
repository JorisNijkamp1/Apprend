import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Button } from 'react-bootstrap'

import './FlashcardTable.css'

import { addColumn, deleteColumn, editColumnName, addFlashcard, editFlashcard } from './actions'
import AddColumnButton from './sub-components/AddColumnButton'

const FlashcardTableComponent = (props) => {

    const buttons = [
        {
            type: 'Text',
        }, 
        {
            type: 'Image'
        },
        {
            type: 'Audio'
        }
    ]

    const handleAddColumn = (e) => {
        const type = e.currentTarget.getAttribute('name')
        const name = e.target.value
        console.log(type, name)
        props.addColumn(type, name, props.deck.creatorId, props.deck._id)
    }

    const handleDeleteColumn = (index) => {
        props.deleteColumn(index, props.deck.creatorId, props.deck._id)
    }

    let timer
    let value
    const handleEditColumnName = (e, index) => {
        e.preventDefault()
        value = e.target.value
        clearTimeout(timer)
        timer = setTimeout(() => props.editColumnName(index, props.deck.creatorId, props.deck._id, value), 1000)
    }

    let timerFlashcard
    let valueFlashcard
    const handleEditFlashcardColumn = (e, flashcardId, indexColumn) => {
        e.preventDefault()
        valueFlashcard = e.target.value
        clearTimeout(timerFlashcard)
        timerFlashcard = setTimeout(() => props.editFlashcard(valueFlashcard, props.deck.creatorId, props.deck._id, flashcardId, indexColumn), 1000)
        
    }

    const handleAddFlashcard = () => {
        props.addFlashcard(props.deck.creatorId, props.deck._id)
    }

    const AddColumnButtons = () => {
        return (
            <>
                <Row className="justifty-content-center justify-content-md-end mt-5">

                {buttons.map((button, index) => (
                    <Col xs={12} md={4}>
                        <AddColumnButton 
                            key={button.type + index} 
                            name={button.type} value={'test'} 
                            buttonType={button.type} 
                            onClick={handleAddColumn}/>
                    </Col>
                ))}
                </Row>
            </>
        )
    }
    const showAllColumnNames = (columns) => {

        return columns.map((column, index) => (
            // <div className="text-center" style={{'min-width': '400px'}}>{column}</div>
            // <td style={{'min-width': '400px'}}>{column}</td>
            // <Col xs={6} md={4} className="py-1" ><b>{column.value}</b></Col>
            <td key={column.type + index}>
                <input 
                    name={column.name + '!' + index}
                    defaultValue={column.name} 
                    placeholder={column.name} 
                    className="form-control" 
                    onInput={(e) => handleEditColumnName(e, index)}
                    />
            </td>
        ))
    }

    const showAllColumnTypes = (columns) => {
        return columns.map((column, index) => (
            <td key={column.type + index} onClick={() => handleDeleteColumn(index)}>
                <strong>{column.type}</strong>
            </td>
        ))
    }

    const showAllFlashcards = (flashcards) => {

        const allColumns = (columns) => {
            return columns.map(column => {
                if (column.type === '1'){
                    return (
                        <Col className="py-3" xs={6} md={4}><input className="form-control" value={column.value} placeholder={column.value} /></Col>
                    )
                }  else if (column.type === '2' || column.type === '3') {
                    return (
                        <Col className="py-3" xs={6} md={4}><input type="file" /></Col>
                    )
                }
            }
            )
        }
        return flashcards.map((flashcard, index) => (
            // <Row className="text-center flex-nowrap" style={{'overflow-x': 'auto'}}>
            <Card className="my-1">

                <Row className="flex-nowrap">
                    <Col xs={1} className="py-3">
                        {index+1}
                    </Col>
                {allColumns(flashcard.columns)}
            </Row>
            </Card>

        ))
    }

    const ShowFlashCards = (flashcards) => {
        return flashcards.map((flashcard, indexFlashcard) => (
            <tr key={flashcard._id} className={indexFlashcard === 0 ? 'mt-3' : ''}>
                <td>
                    {indexFlashcard + 1}
                </td>
                {flashcard.columns.map((column, indexColumn) => {
                    return (
                        <td key={column._id}>
                            <input 
                                className="form-control"
                                defaultValue={column.value}
                                placeholder={column.value}
                                onChange={(e) => handleEditFlashcardColumn(e, flashcard._id, indexColumn )}
                                />
                        </td>
                    )
                })}
            </tr>
        ))
    }

    return (
        <>
            <AddColumnButtons />
            <Button className="w-100 my-3" variant="outline-danger" onClick={handleAddFlashcard}>NIEUWE KAART</Button>
            <div className="w-100 mb-5" style={{'overflow-x': 'auto'}}>

            <table className="my-5">
                <tr>
                    <td>
                        Type
                    </td>
                    {showAllColumnTypes(props.deck.columns)}
                </tr>
                <tr>
                    <td>
                        Name
                    </td>
                    {showAllColumnNames(props.deck.columns)}
                </tr>
            </table>
            <table className="mt-5">
                {ShowFlashCards(props.deck.flashcards)}
            </table>
            </div>

        </>
    )
}

const mapStateToProps = state => {
    return {
        deck: state.decks.deck
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addColumn: (type, name, creator, deck) => dispatch(addColumn(type, name, creator, deck)),
        deleteColumn: (index, creator, deck) => dispatch(deleteColumn(index, creator, deck)),
        editColumnName: (index, creator, deck, value) => dispatch(editColumnName(index, creator, deck, value)),
        addFlashcard: (creator, deck) => dispatch(addFlashcard(creator, deck)),
        editFlashcard: (value, creator, deck, flashcard, indexFlashcard, indexColumn) => dispatch(editFlashcard(value, creator, deck, flashcard, indexFlashcard, indexColumn)),
    }
}

export const FlashcardTable = connect(mapStateToProps, mapDispatchToProps)(FlashcardTableComponent);