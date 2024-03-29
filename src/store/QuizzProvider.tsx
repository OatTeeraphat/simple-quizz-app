import React, { createContext, useReducer } from 'react'

import { saveToLeaderBoardStorage } from '@/repositories/LeaderBoardRepository'
import { shuffleQuestionAndAnswer, UUID } from '@/utils/helper'


type QuizzState = {
  id : string,
  name : string
  score: number,
  count: number,
  question : QuestionItem[]
}

type QuizzActionsType = {
  type : 'RESET_QUIZZ' | 'INIT_QUIZZ' | 'GET_SHUFFLE_QUESTION' | 'SELECT_ANSWER' | 'SUBMIT_QUIZZ' 
  payload ?: any // TODO,
  navigation ?: any
}

type QuestionItem = {
  index : number
  question : string
  answers : string[]
  correctAnswerIndex : number
  selectedAnswerIndex : number | boolean
}

const QuizzState = {
  id : '',
  name: '',
  score: 0,
  count: 0,
  question: []
}


function QuizzReducer(state: QuizzState, action: QuizzActionsType) {

  switch (action.type) {

    case 'RESET_QUIZZ' :
      return { ...state, id : '', name : '', score: 0, count: 0, question: [] }

    case 'INIT_QUIZZ' :
      
      action.navigation.navigate('Question')
      return { ...state, name: action.payload, score: 0, count: 0, id: UUID() }

    case 'GET_SHUFFLE_QUESTION':
      return { ...state, question: shuffleQuestionAndAnswer(action.payload) };

    case 'SELECT_ANSWER':
      
      let sum_select = state.question.filter(it => it.selectedAnswerIndex !== false)      
      state.question[action.payload[0]].selectedAnswerIndex = action.payload[1]
      
      return { ...state, question: [...state.question], count: sum_select.length + 1 }

    case 'SUBMIT_QUIZZ':

      let sum_score = state.question.filter(it => it.correctAnswerIndex === it.selectedAnswerIndex)
      
      saveToLeaderBoardStorage({ id: state.id, name : state.name, score: sum_score.length })
      .then(() => {
        action.navigation.navigate('LeaderBoard')
        return { ...state, id : '', name : '', score: 0, count: 0, question: [] }
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
