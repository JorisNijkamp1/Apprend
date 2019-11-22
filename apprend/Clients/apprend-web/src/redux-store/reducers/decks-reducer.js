import { DECKS_ADD_DECK,  } from '../actions/action-types'
import produce from 'immer'

const initialState = {
    decks: []
}

export default function decksReducer(state = initialState, action){
    return produce(state, draft => {
        switch(action.type){
            case DECKS_ADD_DECK:
                draft['decks'].push(action.payload)
                break
    
            default:
                return draft
        }
    })
        //    switch(action.type){
        //     case DECKS_ADD_DECK:
        //         let decks = [...state.decks]
        //         decks.push()
        //         return {...state, decks: { ...state.decks, } }
    
        //     default:
        //         return state
        // }

}