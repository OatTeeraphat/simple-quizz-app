import React, {useEffect, useContext, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { LeaderBoardContext } from '@/store/LeaderBoardProvider'
import { loadLeaderBoardFromStorage } from '@/repositories/LeaderBoardRepository'


const LeaderBoardScreen: React.FC = () => {

  const [state, setStage] = useState( [] )

  useEffect(() => {

    loadLeaderBoardFromStorage()
        .then((value) => {
          console.log(value)
          setStage(value)
        })

  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LeaderBoard</Text>
      <Text>{JSON.stringify(state)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
  },
});

export default LeaderBoardScreen;
