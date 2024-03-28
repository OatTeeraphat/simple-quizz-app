import React, { createContext, useReducer } from 'react'

import { saveToLeaderBoardStorage, loadLeaderBoardFromStorage } from '@/repositories/LeaderBoardRepository'
import { shuffleQuestionAndAnswer, UUID } from '@/utils/helper'


type QuizzState = {
  id : string,
  name : string
  score: number,
  question : QuestionItem[]
}

type QuizzActionsType = {
  type : 'INIT_QUIZZ' | 'GET_SHUFFLE_QUESTION' | 'SELECT_ANSWER' | 'SUBMIT_QUIZZ' 
  payload ?: any // TODO,
  navigation ?: any
}

type QuestionItem = {
  index : number
  question : string
  answers : string[]
  correctAnswerIndex : number
  selectedAnswerIndex : number
}

const QuizzState = {
  id : '',
  name: '',
  score: 0,
  question: []
}


function QuizzReducer(state: QuizzState, action: QuizzActionsType) {

  switch (action.type) {

    case 'INIT_QUIZZ' :
      action.navigation.navigate('Question')
      return { ...state, name: action.payload, score: 0, id: UUID() }

    case 'GET_SHUFFLE_QUESTION':
      return { ...state, question: shuffleQuestionAndAnswer(action.payload) };

    case 'SELECT_ANSWER':
      state.question[action.payload[0]].selectedAnswerIndex = action.payload[1]
      return { ...state, question: [...state.question] }

    case 'SUBMIT_QUIZZ':

      let sum_score = state.question.filter(it => it.correctAnswerIndex === it.selectedAnswerIndex)

      // save to leader board
      saveToLeaderBoardStorage({ id: state.id, name : 'oat', score: sum_score.length })
      .then(() => {
        action.navigation.navigate('LeaderBoard')
        return { ...state, score: sum_score.length }
      })


    default:
      return state;

  }

}

const QuizzContext = createContext<any>({})

const QuizzProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(QuizzReducer, QuizzState);
  
  return (
    <QuizzContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizzContext.Provider>
  );

}

export {QuizzContext, QuizzProvider}
