import {ADD_ANNOUNCE, GET_ANNOUNCE} from '../actions/types.js';


const initialState = {
    announce : []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_ANNOUNCE:
            return {
                ...state,
                announce : [...state.announce, action.payload]
            };
        case GET_ANNOUNCE:
            return {
                ...state,    
                announce: state.announce
            };
        
        default:
            return state;
    }
}