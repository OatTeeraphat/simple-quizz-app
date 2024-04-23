import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';

import WelcomeScreen from '@/screens/WelcomeScreen'
import QuestionScreen from '@/screens/QuestionScreen';
import LeaderBoardScreen from '@/screens/LeaderBoardScreen';

const Stack = createNativeStackNavigator();

const ScreenOption = {
  headerBackVisible:false,
  headerLeft: () => null
}



const AppNavigator: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome" >

            {/* Screens */}
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={ScreenOption} />
            <Stack.Screen name="Question" component={QuestionScreen} options={ScreenOption} />
            <Stack.Screen name="LeaderBoard" component={LeaderBoardScreen} options={ScreenOption} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};


export default AppNavigator;