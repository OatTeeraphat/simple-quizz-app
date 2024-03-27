import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View, Button, Text } from 'react-native';
import Question from '@/components/Question';
import { questions } from '@/utils/question';
import { shuffleList, shuffleAnswersInList, shuffleQuestionAndAnswer } from '@/utils/helper';


interface Props {
  navigation: any,
}


const QuestionScreen: React.FC<Props> = ({navigation}) => {

  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionList, setQuestionList] = useState([])

  useEffect(() => {

    const shuffledQuestion = () => {

      let _shuffled = shuffleQuestionAndAnswer(questions)
      setQuestionList(_shuffled)

    }

    shuffledQuestion()

  }, [])


  // Handle correct answer
  const handleSelectAnswer = (selectedAnswerIndex: number) => {

    const correctAnswerIndex = questions[questionIndex].correctAnswerIndex;

    if (selectedAnswerIndex === correctAnswerIndex) {
      // Handle correct answer logic

    } else {
      // Handle incorrect answer logic
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper}>
        
        {questionList.map( (it, index) => (

            <Question
              key={index}
              question={it.question}
              answers={it.answers}
              onSelectAnswer={handleSelectAnswer}
            />

        ))}

      </ScrollView>

    </SafeAreaView>

      // {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      //   <Text>Home Screen</Text>
      //   <Button
      //       title="Go to Leaderboards"
      //       onPress={() => navigation.navigate('Leaderboard')}
      //     />
      // </View> */}


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
});

export default QuestionScreen;