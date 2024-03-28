import React, { cloneElement } from "react"
import { QuizzProvider } from '@/store/QuizzProvider'
import { LeaderBoardProvider } from '@/store/LeaderBoardProvider'

export const ProviderComposer = ({ children }) => {
  
    return(
        <LeaderBoardProvider>
            <QuizzProvider>
                {children}
            </QuizzProvider>
        </LeaderBoardProvider>
    )
  
  }