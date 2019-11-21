import { CREATEDECK_EDIT_DECKNAME, CREATEDECK_SET_ISLOADING } from '../actions/action-types'

const initialState = {
    deckName: undefined,
    isLoading: false,
}

export default function createDeckReducer(state = initialState, action){
    switch(action.type){
        case CREATEDECK_EDIT_DECKNAME:
            return {...state, deckName: action.payload}
        case CREATEDECK_SET_ISLOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}