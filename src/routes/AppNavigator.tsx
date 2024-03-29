import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import  { createNativeStackNavigator } from '@react-navigation/native-stack';


import { QuizzProvider } from '@/store/QuizzProvider'

import WelcomeScreen from '@/screens/WelcomeScreen'
import QuestionScreen from '@/screens/QuestionScreen';
import LeaderBoardScreen from '@/screens/LeaderBoardScreen';

const Stack = createNativeStackNavigator();

const ScreenOption = {
  headerBackVisible : false
}

const AppNavigator: React.FC = () => {
  return (
    <QuizzProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" >

        {/* Screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Question" component={QuestionScreen} />
        <Stack.Screen name="LeaderBoard" component={LeaderBoardScreen} options={ScreenOption} />
        
      </Stack.Navigator>
    </NavigationContainer>
    </QuizzProvider>
  );
};

export default AppNavigator;