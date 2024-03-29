import React, {useEffect, useContext, useState, useRef} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { QuizzContext } from '@/store/QuizzProvider'

interface Props {
  navigation: any,
}

const WelcomeScreen: React.FC<Props> = ({navigation}) => {

  const { state, dispatch } = useContext( QuizzContext )
  const [ name, setName ] = useState('')
  
  const todoInput = useRef<any>();

  useEffect( () => {
    
    dispatch({ type: 'RESET_QUIZZ' })
    
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.welcomeEntry}>
        <Text style={styles.title}>🤟 QuizzApp</Text>
        <TextInput
          style={styles.inputName}
          placeholder="กรอกชื่อผู้เล่น" 
          onChangeText={text => setName(text)}
          ref={todoInput}
        />
        <TouchableOpacity 
          onPress={() => (
            dispatch({ type: 'INIT_QUIZZ', payload: name, navigation : navigation }),
            todoInput.current.clear()
          )}
          style={styles.submitButton} 
        >
          <Text style={styles.submitButtonTxt}>Let's Start</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.welcomePanelBar}> 
        <TouchableOpacity
          onPress={() => (navigation.navigate('LeaderBoard')) }
        >
          <Text>🏆 Leader Board</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent : 'space-between',
    alignItems : 'center',
    backgroundColor: "#FFFFFF",
    padding : 15,
    paddingBottom: 45
  },
  welcomeEntry : {
    width : '100%',
    alignItems : 'center',
    paddingTop : 150
  },
  welcomePanelBar : {
  },
  inputName : {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
    textAlign : 'center',
    marginBottom : 15,
    width : '100%',
    maxWidth : 300
  },
  title: {
    fontSize : 20,
    fontWeight : 'bold',
    marginBottom : 15,
    textAlign : 'center',
  },
  submitButton : {
    padding: 10,
    alignItems : 'center',
    minWidth : 100,
    marginBottom: 15,
    backgroundColor: '#2b6ff3',
    borderRadius: 5,
  },
  submitButtonTxt : {
    color : '#fff',
    fontWeight : 'bold',
  }
});

export default WelcomeScreen;
