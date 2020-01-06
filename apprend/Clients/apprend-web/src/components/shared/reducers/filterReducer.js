import produce from 'immer'
import {FILTER_SET_TAGS, DELETE_FILTERED_TAG, CLEAR_FILTERED_TAGS} from '../../../redux/actionTypes'

const initialState = {
    filteredTags: []
};

export default function filterReducer(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
            case FILTER_SET_TAGS:
                draft['filteredTags'].push(action.payload)
                break;
            case DELETE_FILTERED_TAG:
                let filtered = state.filteredTags.filter(function(value, index, arr){
                    return value !== action.payload;
                });
                draft['filteredTags'] = filtered
                break;
            case CLEAR_FILTERED_TAGS:
                draft['filteredTags'] = []
                break;
            default:
                return draft
        }
    })
}