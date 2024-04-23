export function shuffleList(list) {
    return list
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    
  }
  
export function shuffleAnswersInList(list) {

    const q_list = list.map(item => {
      
      let _correctAnswer = item.answers[item.correctAnswerIndex]
      let _shuffleList = shuffleList(item.answers)

      return {
        ...item,
        ...{ 
          answers : _shuffleList,
          correctAnswerIndex : _shuffleList.indexOf(_correctAnswer),
          selectedAnswerIndex : false
        }
      }

    });

    return q_list;

}

export function shuffleQuestionAndAnswer(list) {

  list = shuffleList(list)
  list = shuffleAnswersInList(list)

  return list

}


export function UUID () {
  return Date.now().toString(36)
}