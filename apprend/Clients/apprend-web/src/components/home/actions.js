import { set_DecksHome } from '../../../src_old/redux-store/actions/action-types'

export function setHomepageDecksAction(name){
    return {
        type: set_DecksHome,
        payload: name
    }
}