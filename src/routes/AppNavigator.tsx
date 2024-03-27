import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import  { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionScreen from '@/screens/QuestionScreen';
import LeaderboardScreen from '@/screens/LeaderBoardScreen';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* Screens */}
        <Stack.Screen name="Question" component={QuestionScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;