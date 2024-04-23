import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { LeaderBoard } from '@/models/leaderBoardModel'
import { QuizzInit, QuizzSelected } from '@/store/quizz/quizzType'
import { shuffleQuestionAndAnswer, UUID } from '@/utils/helper'
import { AppThunk } from '../store';

const leaderBoardState : LeaderBoard[] = []

export const leaderBoardSlice = createSlice({

    name: 'leaderBoard',
    initialState : leaderBoardState,
    reducers: {

      leaderBoardAdded(state, action: PayloadAction<LeaderBoard>) {

        const { id, name, score } = action.payload
        
        state.push({ 
            id : id, 
            name : name, 
            score : score 
        })

      }
    
    }

});

export const { leaderBoardAdded } = leaderBoardSlice.actions
export const leaderBoardSliceReducer =  leaderBoardSlice.reducer
