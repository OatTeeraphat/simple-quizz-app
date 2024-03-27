import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuestionProps {
  question: string;
  answers: string[];
  onSelectAnswer: (answerIndex: number) => void;
}

const Question: React.FC<QuestionProps> = ({ question, answers, onSelectAnswer }) => {
  return (

    <View style={styles.container} key={question}>

      <Text style={styles.question}>{question}</Text>

      {answers.map((answer, index) => (

          <TouchableOpacity key={index} style={styles.answerButton} onPress={( ) => onSelectAnswer(index) }>
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
});

export default Question;