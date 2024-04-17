import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { AppThunk } from '../store';

import { QuizzState } from '@/models/quizzModel'
import { QuizzInit, QuizzSelected } from '@/store/quizz/quizzType'
import { leaderBoardAdded } from '@/store/leaderBoard/leaderBoardSlice'

import { shuffleQuestionAndAnswer, UUID } from '@/utils/helper'


const initQuizzState : QuizzState = {
    id : '',
    name : '',
    score: 0,
    count: 0,
    question : []
}

export const quizzSlice = createSlice({

    name: 'quizz',
    initialState : initQuizzState,
    reducers: {

      quizzInit(state, action: PayloadAction<QuizzInit>) {

        const { name, question } = action.payload
        
        state.id = UUID()
        state.name = name
        state.question = shuffleQuestionAndAnswer(question)
        state.count, state.score = 0

      },

      quizzSelectAnswer(state, action: PayloadAction<QuizzSelected>) {

        const { selectedQuestionIdx, selectedAnswerIdx } = action.payload
        const q_selected = state.question.find(item => item.index === selectedQuestionIdx)
        const q_count = state.question.filter(item => item.selectedAnswerIndex !== false)
        
        if (q_selected) {
          q_selected.selectedAnswerIndex = selectedAnswerIdx
          state.count = q_count.length + 1
        }

      },
      
      quizzSumScore(state) {
        const sum_score = state.question.filter(it => it.correctAnswerIndex === it.selectedAnswerIndex)
        state.score = sum_score.length
      }

    },

});


export const { quizzInit, quizzSelectAnswer, quizzSumScore } = quizzSlice.actions
export const quizzSliceReducer = quizzSlice.reducer


export const newSessionQuizz = (name : string): AppThunk => async (dispatch) => {

  const response = await require('../../../questions.json');
  //await new Promise(resolve => setTimeout(resolve, 10000));
  if (response) {
    return dispatch(quizzInit({ name : name, question : response }))
  }

  return 

};


export const submitSessionQuizz = () : AppThunk => async (dispatch, getState) => {

   Promise.all([
    dispatch(quizzSumScore()),
    dispatch(
      leaderBoardAdded({ 
        id : getState().questions.id, 
        name : getState().questions.name, 
        score : getState().questions.score 
      })
    )
  ])

}



// // Redux action
// const reduxAction: ActionCreator<Action> = (text: string) => {
//   return {
//     type: SET_TEXT,
//     text
//   };
// };


// // Redux-Thunk action
// const thunkAction: ActionCreator<ThunkAction<Action, IState, void>> = (
//   text: string
// ) => {
//   return (dispatch: Dispatch<IState>): Action => {
//     return dispatch({
//       type: SET_TEXT,
//       text
//     });
//   };
// };


// // Async Redux-Thunk action
// const asyncThinkAction: ActionCreator<
//   ThunkAction<Promise<Action>, IState, void>
// > = () => {
//   return async (dispatch: Dispatch<IState>): Promise<Action> => {
//     try {
//       const text = await Api.call();
//       return dispatch({
//         type: SET_TEXT,
//         text
//       });
//     } catch (e) {}
//   };
// };

