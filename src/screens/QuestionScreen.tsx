import React from 'react'
import { StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

import Question from '@/components/Question'

import { quizzSelectAnswer, submitSessionQuizz } from '@/store/quizz/quizzSlice';
import { QuizzState } from '@/models/quizzModel'

interface Props {
  navigation: any,
}

const QuestionScreen: React.FC<Props> = ({ navigation }) => {

  const dispatch = useDispatch<any>();
  const query : QuizzState = useSelector<any>(state => state.questions)

  // // Handle select answer
  const handleSelectAnswer = (selectedQuestionIdx: number, selectedAnswerIdx: number) => {

    dispatch(
      quizzSelectAnswer({
        selectedQuestionIdx : selectedQuestionIdx, 
        selectedAnswerIdx : selectedAnswerIdx
      })
    )

  };

  // // Handle on submit quizz
  const handleSubmitAnswer = () => {

    dispatch(submitSessionQuizz())
    .then( () => navigation.navigate('LeaderBoard'))

  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.wrapper}>


        {query.question.map((it, idx) => (
            
            <Question
              key={idx}
              questionIndex={it.index}
              question={it.question}
              answers={it.answers}
              selectedAnswerIndex={it.selectedAnswerIndex}
              onSelectAnswer={handleSelectAnswer}
            />

        ))}

          <TouchableOpacity 
            onPress={() => handleSubmitAnswer()}
            style={[
              styles.submitButton,
              query.count == 20 ? styles.submitButtonActive : null
            ]} 
          >
            <Text 
            style={[
              styles.submitButtonTxt,
              query.count == 20 ? styles.submitButtonActive : null
            ]} >
              ส่งคำตอบ
            </Text>

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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign : 'center',
  },
  submitButtonActive : {
    color : '#fff',
    backgroundColor: '#2b6ff3'
  }
});

export default QuestionScreen;