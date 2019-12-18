import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap'

const FlashcardTableComponent = (props) => {

    const col = ['Franse woordjes', 'Nederlandse woordjes', 'Fotootje', 'Geluidje']
    const flashcards = [
        {
            id: 1,
            columns:         [{ 
                type: '1',
                value: 'uno'
            },
            {
                type: '1',
                value: 'dos'
            },{ 
                type: '2',
                value: 'uno'
            },
            {
                type: '3',
                value: 'dos'
            }]
        },
        {
            id: 2,
            columns:         [{ 
                type: '1',
                value: 'auto'
            },
            {
                type: '3',
                value: 'mobiel'
            }]
        }
    ]

    const showAllColumnNames = (columns) => {
        return columns.map(column => (
            // <div className="text-center" style={{'min-width': '400px'}}>{column}</div>
            // <td style={{'min-width': '400px'}}>{column}</td>
            <Col xs={6} md={4} className="py-1" ><b>{column}</b></Col>
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

    return (
        <>
        <div className="text-center" style={{'overflow-x': 'auto', 'white-space': 'nowrap'}}>
            {/* <Row className="text-center flex-nowrap" style={{'overflow-x': 'auto'}}> */}
            <Row className="flex-nowrap">
                <Col xs={1}>
                    <b>#</b>
                </Col>
                {showAllColumnNames(col)}

            </Row>
            {showAllFlashcards(flashcards)}
        </div>
        </>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export const FlashcardTable = connect(mapStateToProps, mapDispatchToProps)(FlashcardTableComponent);