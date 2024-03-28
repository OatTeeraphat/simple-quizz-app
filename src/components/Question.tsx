import React ,{ useReducer, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


interface Props {
  questionIndex: number;
  question: string;
  answers: string[];
  selectedAnswerIndex : number | false;
  onSelectAnswer: (answerIndex: number, index: number) => void;
}

const Question: React.FC<Props> = ({ questionIndex, question, answers, selectedAnswerIndex, onSelectAnswer }) => {
  
  return (

    <View style={styles.container} key={questionIndex}>

      <Text style={styles.question}>{question}</Text>

      {answers.map((answer, answerIndex) => (

          <TouchableOpacity 
            key={answerIndex} 
            onPress={() => onSelectAnswer(questionIndex, answerIndex)}
            style={[
              styles.answerButton, 
              (answerIndex === selectedAnswerIndex) ? styles.answerButtonSelect : false
            ]} 
          >
            <Text>{answer}</Text>
          </TouchableOpacity>

      ))}

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom : 15,
  },
  question: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  answerButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  answerButtonSelect : {
    backgroundColor: '#aaa',
  }
});

export default Question;