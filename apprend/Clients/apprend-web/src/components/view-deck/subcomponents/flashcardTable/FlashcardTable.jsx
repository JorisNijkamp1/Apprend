import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Button } from 'react-bootstrap'

import './FlashcardTable.css'

import { addColumn, deleteColumn, editColumnName, addFlashcard, editFlashcard, deleteFlashcard } from './actions'
import AddColumnButton from './sub-components/AddColumnButton'
import { Notification } from '../../../shared/components/Notification'
import DeleteButton from './sub-components/DeleteButton'
import StateSwitch from '../../../shared/components/StateSwitch';
import ConfirmationButtons from './sub-components/ConfirmationButtons'

const FlashcardTableComponent = (props) => {

    const [quickDelete, setQuickDelete] = useState(false)
    const [upForDelete, setUpForDelete] = useState()

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

    const handleDeleteSwitch = () => {
        setQuickDelete(!quickDelete)
        setUpForDelete(undefined)
    }

    const handleAddColumn = async (e) => {
        const type = e.currentTarget.getAttribute('name')
        const name = e.target.value
        const result = await props.addColumn(type, name, props.deck.creatorId, props.deck._id)
        Notification(result.message, result.success ? 'success' : 'danger', 600)
    }

    const handleDeleteColumn = async (index) => {
        const result = await props.deleteColumn(index, props.deck.creatorId, props.deck._id)
        setUpForDelete(undefined)
        Notification(result.message, result.success ? 'success' : 'danger', 600)
    }

    let timers = []
    let values = []
    if (props.deck && props.deck.flashcards){
        if (props.deck.flashcards.length > 0) {
            props.deck.flashcards.forEach((fc) => {
                fc.columns.forEach(col => {
                    timers[col._id] = ''
                    values[col._id] = ''
                })
        })
        if (props.deck.columns && props.deck.columns > 0) {
            props.deck.columns.forEach(col => {
                timers[col._id] = ''
                values[col._id] = ''
            })
        }
    } 
    }

    const handleEditColumnName = (e, index, columnId) => {
        e.preventDefault()
        values[columnId] = e.target.value
        clearTimeout(timers[columnId])
        timers[columnId] = setTimeout( async () => {
           const result = await props.editColumnName(index, props.deck.creatorId, props.deck._id, values[columnId])
           Notification(result.message, result.success ? 'success' : 'danger', 500)
        } , 1000)
    }

    const handleEditFlashcardColumn = (e, flashcardId, indexColumn, columnId) => {
        e.preventDefault()
        values[columnId] = e.target.value
        clearTimeout(timers[columnId])
        timers[columnId] = setTimeout( async () => {
            const result = await props.editFlashcard(values[columnId], props.deck.creatorId, props.deck._id, flashcardId, indexColumn)
            Notification(result.message, result.success ? 'success' : 'danger', 500)
        }, 1000)
        
    }

    const handleDeleteFlashcard = async (flashcardId) => {
        const result = await props.deleteFlashcard(flashcardId, props.deck.creatorId, props.deck._id )
        setUpForDelete(undefined)
        Notification(result.message, result.success ? 'success' : 'danger', 1000)
    }

    const handleAddFlashcard = async () => {
        const result = await props.addFlashcard(props.deck.creatorId, props.deck._id)
        Notification(result.message, result.success ? 'success' : 'danger', 1000)
    }

    const handleAllDeleteActions = (func, id) => {
        if (quickDelete){
            func()
        } else {
            setUpForDelete(id)
        }
    }

    const AddColumnButtons = () => {
        return (
            <>
                <Row className="justifty-content-center justify-content-md-end mt-5">

                {buttons.map((button, index) => (
                    <Col xs={12} md={4} key={button.type + index + 'col'}>
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
                    onInput={(e) => handleEditColumnName(e, index, column._id)}
                    />
            </td>
        ))
    }

    const showAllColumnTypes = (columns) => {
        return columns.map((column, index) => (
            <td key={column.type + index}>
                <strong>{column.type}</strong>
                {upForDelete !== index ? 
                <DeleteButton
                    onClick={() => handleAllDeleteActions(() => handleDeleteColumn(index), index)}
                    columnId={column._id}
                    />
                : <ConfirmationButtons onDelete={() => handleDeleteColumn(index)} onCancel={() => setUpForDelete(undefined)} />}
            </td>
        ))
    }

    const ShowFlashCards = (flashcards) => {
        return flashcards.map((flashcard, indexFlashcard) => (
            <tr key={flashcard._id} className={indexFlashcard % 2 === 1 ? 'grey-bg' : ''}>
                <td>
                    {indexFlashcard + 1}
                    {upForDelete !== flashcard._id ? 
                    <DeleteButton
                        columnId={flashcard._id}
                        onClick={() => handleAllDeleteActions(() => handleDeleteFlashcard(flashcard._id), flashcard._id)}
                        />

                    : <ConfirmationButtons onDelete={() => handleDeleteFlashcard(flashcard._id)} onCancel={() => setUpForDelete(undefined)} /> }
                </td>
                {flashcard.columns.map((column, indexColumn) => {
                    return (
                        <td key={column._id}>
                            <input 
                                className="form-control"
                                defaultValue={column.value}
                                placeholder={column.value}
                                onChange={(e) => handleEditFlashcardColumn(e, flashcard._id, indexColumn, column._id )}
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
            <div className="w-100 mb-5" style={{'overflowX': 'auto'}}>
            <StateSwitch 
                label="Enable quick delete?"
                handleSwitch={handleDeleteSwitch}
                text={quickDelete ? 'YOLO': 'im a pussy'}
                />
            <table className="my-5">
                <tbody>
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
                </tbody>
            </table>
            <table className="mt-5">
                <tbody>
                    {ShowFlashCards(props.deck.flashcards)}
                </tbody>
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