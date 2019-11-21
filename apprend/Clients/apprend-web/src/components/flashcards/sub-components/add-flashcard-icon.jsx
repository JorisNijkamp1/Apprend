import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'

export const AddFlashcardIcon = () => {
    return (
        <div className="h-100 row justify-content-center align-items-center">
            <FontAwesomeIcon icon={faPlusCircle}
                             size={"4x"}
                             color={'#7ad765'}
                             className={'hover-shadow'}
                             onClick={() => console.log(1234)}
            />
        </div>
    )
};
