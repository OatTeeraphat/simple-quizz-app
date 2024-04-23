export interface QuizzState {
    id : string,
    name : string
    score: number,
    count: number,
    question : QuestionItem[]
}

export type QuestionItem = {
    index : number
    question : string
    answers : string[]
    correctAnswerIndex : number
    selectedAnswerIndex : number | boolean
}