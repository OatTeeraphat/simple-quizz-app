export function shuffleQuestionAndAnswer(list) {

    list = shuffleList(list)
    list = shuffleAnswersInList(list)

    return list

}


export function shuffleList(list) {
    return list
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    
  }
  
export function shuffleAnswersInList(list) {

    list.forEach(item => {
      
      const _correctAnswer = item.answers[item.correctAnswerIndex]
      //console.log(item, correctAnswer)
      item.answers = shuffleList(item.answers)
      item.correctAnswerIndex = item.answers.indexOf(_correctAnswer)

    });

    return list;
  }
  