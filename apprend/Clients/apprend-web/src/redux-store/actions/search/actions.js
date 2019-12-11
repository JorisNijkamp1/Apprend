import {SEARCH_SET_IS_LOADING, SEARCH_SET_SEARCH_VALUE} from "../action-types";

export function setSearchValue(searchValue){
    return {
        type: SEARCH_SET_SEARCH_VALUE,
        payload: searchValue
    }
}

export function setIsLoading(bool){
    return {
        type: SEARCH_SET_IS_LOADING,
        payload: bool
    }
}
