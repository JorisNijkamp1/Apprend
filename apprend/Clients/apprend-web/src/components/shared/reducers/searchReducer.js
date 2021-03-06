import produce from 'immer'
import {SEARCH_SUGGESTIONS, SEARCH_SET_IS_LOADING, SEARCH_SET_SEARCH_VALUE} from "../../../redux-config/actionTypes";

const initialState = {
    searchValue: null,
    searchSuggestions: null,
    isLoading: false,
};

export default function searchReducer(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {

            case SEARCH_SET_SEARCH_VALUE:
                draft['searchValue'] = action.payload;
                break;

            case SEARCH_SUGGESTIONS:
                draft['searchSuggestions'] = action.payload;
                break;

            case SEARCH_SET_IS_LOADING:
                draft['isLoading'] = action.payload;
                break;

            default:
                return draft
        }
    })
}
