import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import  { createNativeStackNavigator } from '@react-navigation/native-stack';


import { ProviderComposer } from '@/store/Composer'

import WelcomeScreen from '@/screens/WelcomeScreen'
import QuestionScreen from '@/screens/QuestionScreen';
import LeaderBoardScreen from '@/screens/LeaderBoardScreen';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <ProviderComposer>
    <NavigationContainer>
      <Stack.Navigator>

        {/* Screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Question" component={QuestionScreen} />
        <Stack.Screen name="LeaderBoard" component={LeaderBoardScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
    </ProviderComposer>
  );
};

export default AppNavigator;