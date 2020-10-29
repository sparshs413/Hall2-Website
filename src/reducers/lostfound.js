import {ADD_LOSTFOUND, GET_LOSTITEMS, GET_FOUNDITEMS} from '../actions/types.js';


const initialState = {
    lostfound : []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_LOSTFOUND:
            return {
                ...state,
                lostfound : [...state.lostfound, action.payload]
            };
        case GET_LOSTITEMS:
            return {
                ...state,    
                lostfound: state.lostfound.filter(lostfound => lostfound.option === "lost")
            };
        case GET_FOUNDITEMS:
            return {
                ...state,    
                lostfound: state.lostfound.filter(lostfound => lostfound.option === "found")
            };
        default:
            return state;
    }
}