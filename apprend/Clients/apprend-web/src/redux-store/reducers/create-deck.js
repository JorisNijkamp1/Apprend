import { CREATEDECK_EDIT_DECKNAME, CREATEDECK_SET_ISLOADING } from '../actions/action-types'
import produce from 'immer'

const initialState = {
    deckName: undefined,
    isLoading: false,
}

export default function createDeckReducer(state = initialState, action){
    return produce(state, draft => {
        switch(action.type){
            case CREATEDECK_EDIT_DECKNAME:
                draft.deckName = action.payload
                break
            case CREATEDECK_SET_ISLOADING:
                draft.isLoading = action.payload
                break
            default:
                return draft
        }
    })
}