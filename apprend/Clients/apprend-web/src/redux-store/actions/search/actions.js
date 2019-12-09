import {SEARCH_SET_SEARCH_VALUE} from "../action-types";

export function setSearchValue(searchValue){
    return {
        type: SEARCH_SET_SEARCH_VALUE,
        payload: searchValue
    }
}
