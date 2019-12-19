import React from 'react'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'

export default (hoc, deck, func) => {
    let icon
    if (deck.private) {
        icon = {
            icon: faLock,
            title: 'Set this deck to public',
            ownTitle: true,
            funct: func,
            classColor: 'text-red',
        }
    } else {
        icon = {
            icon: faLockOpen,
            title: 'Set this deck to private',
            ownTitle: true,
            funct: func,
            classColor: 'text-green',
        }
    }
    return (
        hoc(icon, deck, 0)
    )
}