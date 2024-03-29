import React, { useEffect, useContext } from 'react'
import { StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Text } from 'react-native'
import { saveToLeaderBoardStorage } from '@/repositories/LeaderBoardRepository'

import Question from '@/components/Question'
import { QuizzContext } from '@/store/QuizzProvider'

import { questions } from '@/utils/question'


interface Props {
  navigation: any,
}

const QuestionScreen: React.FC<Props> = ({ navigation }) => {

  const { state, dispatch } = useContext( QuizzContext )

  useEffect(() => {
    
    dispatch({ type: 'GET_SHUFFLE_QUESTION', payload: questions })

  }, [])

  // Handle correct answer
  const handleSelectAnswer = (selectedQuestionIdx: number, selectedAnswerIdx: number) => {

    dispatch({ type: 'SELECT_ANSWER', payload: [selectedQuestionIdx, selectedAnswerIdx] })

  };

  const handleSubmitAnswer = () => {

    dispatch({ type: 'SUBMIT_QUIZZ', navigation : navigation })    

  };
  

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.wrapper}>

        {state.question.map((it, idx) => (

            <Question
              key={idx}
              questionIndex={idx}
              question={it.question}
              answers={it.answers}
              selectedAnswerIndex={it.selectedAnswerIndex}
              onSelectAnswer={handleSelectAnswer}
            />

        ))}

          <TouchableOpacity 
            onPress={() => handleSubmitAnswer()}
            style={[
              styles.submitButton
            ]} 
          >
            <Text style={styles.submitButtonTxt}>ส่งคำตอบ</Text>

          </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
    width: "100%",
    paddingBottom: 60
  },
  submitButton : {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
    textAlign : 'center'
  },
  submitButtonTxt : {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign : 'center',
  },
  submitButtonActive : {
    color : '#fff',
    backgroundColor: '#2b6ff3'
  }
});

export default QuestionScreen;