import axios from 'axios'

//ACTION TYPES
const GET_ALL_DRAWINGS = 'GET_ALL_DRAWINGS'
const SAVE_DRAWING = 'SAVE_DRAWING'
const DRAW_LINES = 'DRAW_LINES'

//ACTION CREATORS
const gotAllDrawings = drawings => ({
  type: GET_ALL_DRAWINGS,
  drawings
})

const savedDrawing = drawing => ({
  type: SAVE_DRAWING,
  drawing
})

export const drawnLines = lines => ({
  type: DRAW_LINES,
  lines
})

//THUNKS

export const getAllDrawings = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/drawings')
      dispatch(gotAllDrawings(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const saveDrawing = drawing => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/drawings', drawing)
      dispatch(savedDrawing(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//INITIAL STATE
const initialState = {
  allDrawings: [],
  singleDrawing: {},
  lines: []
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DRAWINGS: {
      return { ...state, allDrawings: action.drawings }
    }
    case SAVE_DRAWING: {
      return { ...state, singleDrawing: action.drawing }
    }
    case DRAW_LINES: {
      return { ...state, lines: action.lines }
    }
    default:
      return state
  }
}
