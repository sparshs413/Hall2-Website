import axios from 'axios';
import {ADD_ANNOUNCE, GET_ANNOUNCE } from "./types";

//Add announce
export const addAnnounce = (announce) => (dispatch, getState) => {
    axios
        .post("/announce/", announce)
        .then( res => {
            dispatch ({
                type: ADD_ANNOUNCE,
                payload: res.data
                // createMessage({ addlostfound: "lostfound Added"})
            });
        })
        .catch(err => console.log(err));
};

//GET Announce
export const getAnnounce = () => (dispatch, getState) => {
    axios
        .get("/announce")
        .then( res => {
            dispatch ({
                type: GET_ANNOUNCE,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};
