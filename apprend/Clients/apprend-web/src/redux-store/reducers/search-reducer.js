import produce from 'immer'
import {SEARCH_SET_SEARCH_VALUE} from "../actions/action-types";

const initialState = {
    searchValue: null
};

export default function searchReducer(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {

            case SEARCH_SET_SEARCH_VALUE:
                draft['searchValue'] = action.payload;
                break;

            default:
                return draft
        }
    })
}
