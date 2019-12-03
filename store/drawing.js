import axios from 'axios';
const LOCALHOST = require('../secrets');

//ACTION TYPES
const GET_ALL_DRAWINGS = 'GET_ALL_DRAWINGS';
const GET_DRAWING = 'GET_DRAWING';
const SAVE_DRAWING = 'SAVE_DRAWING';
const DRAW_LINES = 'DRAW_LINES';
const GET_NEARBY_DRAWINGS = 'GET_NEARBY_DRAWINGS'

//ACTION CREATORS
const gotAllDrawings = drawings => ({
  type: GET_ALL_DRAWINGS,
  drawings,
});

const gotDrawing = drawing => ({
  type: GET_DRAWING,
  drawing,
});

const savedDrawing = drawing => ({
  type: SAVE_DRAWING,
  drawing,
});

export const drawnLines = lines => ({
  type: DRAW_LINES,
  lines,
});

const gotNearbyDrawings = nearbyDrawings => ({
  type: GET_NEARBY_DRAWINGS,
  nearbyDrawings
})

//THUNKS
export const getAllDrawings = () => {
  return async dispatch => {
    try {
      let { data } = await axios.get(`${LOCALHOST}/api/drawings`);
      // let lines = await JSON.parse(data.lines);
      // data = { ...data, lines: lines };
      dispatch(gotAllDrawings(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getNearbyDrawings = (lat, long) => {
  return async dispatch => {
    try {
      let { data } = await axios.get(`${LOCALHOST}/api/drawings?latitude=${lat}&longitude=${long}`);
      // let lines = await JSON.parse(data.lines);
      // data = { ...data, lines: lines };
      dispatch(gotNearbyDrawings(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getDrawing = id => {
  return async dispatch => {
    try {
      let { data } = await axios.get(`${LOCALHOST}/api/drawings/${id}`);
      data = data.lines;
      data = await JSON.parse(data);
      dispatch(gotDrawing(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const saveDrawing = drawing => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`${LOCALHOST}/api/drawings`, drawing);
      dispatch(savedDrawing(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//INITIAL STATE
const initialState = {
  allDrawings: [],
  singleDrawing: {},
  lines: [],
};

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DRAWING: {
      return { ...state, lines: action.drawing };
    }
    case GET_ALL_DRAWINGS: {
      return {
        ...state,
        allDrawings: action.drawings,
      };
    }
    case SAVE_DRAWING: {
      return { ...state, allDrawings: [...state.allDrawings, action.drawing] };
    }
    case DRAW_LINES: {
      return { ...state, lines: [...state.lines, action.lines] };
    }
    case GET_NEARBY_DRAWINGS: {
      return {
        ...state,
        allDrawings: action.nearbyDrawings
      }
    }
    default:
      return state;
  }
}
