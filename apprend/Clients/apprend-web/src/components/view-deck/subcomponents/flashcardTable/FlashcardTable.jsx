import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Button } from 'react-bootstrap'

import './FlashcardTable.css'

import { addColumn, deleteColumn, editColumnName, addFlashcard, editFlashcard, deleteFlashcard } from './actions'
import AddColumnButton from './sub-components/AddColumnButton'
import { Notification } from '../../../shared/components/Notification'

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

    const handleAddColumn = async (e) => {
        const type = e.currentTarget.getAttribute('name')
        const name = e.target.value
        const result = await props.addColumn(type, name, props.deck.creatorId, props.deck._id)
        Notification(result.message, result.success ? 'success' : 'danger', 600)
    }

    const handleDeleteColumn = async (index) => {
        const result = await props.deleteColumn(index, props.deck.creatorId, props.deck._id)
        Notification(result.message, result.success ? 'success' : 'danger', 600)
    }

    let timer
    let value
    const handleEditColumnName = (e, index) => {
        e.preventDefault()
        value = e.target.value
        clearTimeout(timer)
        timer = setTimeout( async () => {
           const result = await props.editColumnName(index, props.deck.creatorId, props.deck._id, value)
           Notification(result.message, result.success ? 'success' : 'danger', 500)
        } , 1000)
    }

    let timerFlashcard
    let valueFlashcard
    const handleEditFlashcardColumn = (e, flashcardId, indexColumn) => {
        e.preventDefault()
        valueFlashcard = e.target.value
        clearTimeout(timerFlashcard)
        timerFlashcard = setTimeout( async () => {
            const result = await props.editFlashcard(valueFlashcard, props.deck.creatorId, props.deck._id, flashcardId, indexColumn)
            Notification(result.message, result.success ? 'success' : 'danger', 500)
        }, 1000)
        
    }

    const handleDeleteFlashcard = async (flashcardId) => {
        const result = await props.deleteFlashcard(flashcardId, props.deck.creatorId, props.deck._id )
        Notification(result.message, result.success ? 'success' : 'danger', 1000)
    }

    const handleAddFlashcard = async () => {
        const result = await props.addFlashcard(props.deck.creatorId, props.deck._id)
        Notification(result.message, result.success ? 'success' : 'danger', 1000)
    }

    const AddColumnButtons = () => {
        return (
            <>
                <Row className="justifty-content-center justify-content-md-end mt-5">

                {buttons.map((button, index) => (
                    <Col xs={12} md={4}>
                        <AddColumnButton 
                            key={button.type + index} 
                            name={button.type} value={''} 
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

    const ShowFlashCards = (flashcards) => {
        return flashcards.map((flashcard, indexFlashcard) => (
            <tr key={flashcard._id} className={indexFlashcard % 2 === 1 ? 'grey-bg' : ''}>
                <td onClick={() => handleDeleteFlashcard(flashcard._id)}>
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
        deleteFlashcard: (flashcardId, creator, deck) => dispatch(deleteFlashcard(flashcardId, creator, deck)),
    }
}

export const FlashcardTable = connect(mapStateToProps, mapDispatchToProps)(FlashcardTableComponent);