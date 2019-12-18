import { CREATEDECK_EDIT_DECKNAME, CREATEDECK_SET_ISLOADING, CREATEDECK_ADD_TAG, CREATEDECK_DELETE_TAG, CREATEDECK_CLEAR_TAGS } from '../actions/action-types'
import produce from 'immer'

const initialState = {
    deckName: undefined,
    isLoading: false,
    tags: []
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
            case CREATEDECK_ADD_TAG:
                draft['tags'].push(action.payload)
                break
            case CREATEDECK_DELETE_TAG:
                let filtered = state.tags.filter(function(value, index, arr){
                    return value !== action.payload;
                });
                draft['tags'] = filtered
                break
            case CREATEDECK_CLEAR_TAGS:
                draft['tags'] = []
                break
            default:
                return draft
        }
    })
}