import { QuestionItem } from '@/models/quizzModel'

export type QuizzInit = {
  name : string,
  question : QuestionItem[]
}

export type QuizzSelected = {
  selectedQuestionIdx : number,
  selectedAnswerIdx : number
}