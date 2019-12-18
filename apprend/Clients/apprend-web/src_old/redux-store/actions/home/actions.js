import { set_DecksHome } from '../action-types'

export function setHomepageDecksAction(name){
    return {
        type: set_DecksHome,
        payload: name
    }
}