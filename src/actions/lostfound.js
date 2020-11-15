import axios from 'axios';
import { ADD_LOSTFOUND, GET_LOSTITEMS, GET_FOUNDITEMS } from "./types";
// import { createMessage, returnErrors } from "./messages";

//Add lostfound
export const addlostfound = (lostfound) => (dispatch, getState) => {
    axios
        .get("/lostfounds/", lostfound)
        .then( res => {
            dispatch ({
                type: ADD_LOSTFOUND,
                payload: res.data
                // createMessage({ addlostfound: "lostfound Added"})
            });
        })
        .catch(err => console.log(err));
};


//GET LostItems
export const getLostItems = () => (dispatch, getState) => {
    axios
        .get("/LostItems")
        .then( res => {
            dispatch ({
                type: GET_LOSTITEMS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};


//GET FoundItems
export const getFoundItems = () => (dispatch, getState) => {
    axios
        .get("/FoundItems")
        .then( res => {
            dispatch ({
                type: GET_FOUNDITEMS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

