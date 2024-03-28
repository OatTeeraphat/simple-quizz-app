import React, { createContext, useReducer } from 'react'

import { loadLeaderBoardFromStorage } from '@/repositories/LeaderBoardRepository'


type LeaderBoardState = {
  board : ScoreItem[]
}

type LeaderBoardActionsType = {
  type : 'GET_LEADER_BOARD'
  payload ?: any // TODO
}

type ScoreItem = {
  name : string
  score: number,
}

const LeaderBoardState = {
  board : []
}


function LeaderBoardReducer(state: LeaderBoardState, action: LeaderBoardActionsType) {

  switch (action.type) {

    case 'GET_LEADER_BOARD':
      return { ...state, board: action.payload };

    default:
      return state;

  }

}

const LeaderBoardContext = createContext<any>({})

const LeaderBoardProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(LeaderBoardReducer, LeaderBoardState);
  
  return (
    <LeaderBoardContext.Provider value={{ state, dispatch }}>
      {children}
    </LeaderBoardContext.Provider>
  );

}

export {LeaderBoardContext, LeaderBoardProvider}
