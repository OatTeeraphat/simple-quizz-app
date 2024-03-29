import React, {useEffect, useContext, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { loadLeaderBoardFromStorage } from '@/repositories/LeaderBoardRepository'

interface Props {
  navigation: any,
}

const LeaderBoardScreen: React.FC<Props> = ({navigation}) => {

  const [leaderBoard, setLeaderBoard] = useState( [] )

  useEffect(() => {

    loadLeaderBoardFromStorage()
        .then((value) => {
          setLeaderBoard(value.sort((a, b) => b.score - a.score))
        })

  }, [])

  return (
    <View style={styles.container}>
      
      <View style={styles.leaderBoard}>
        
        <ScrollView style={styles.scrollWrapper}>

          {leaderBoard.map((it, idx) => (

            <View style={styles.scrollItem} key={idx}>

              <View style={styles.scrollItemLeft}>
                <Text style={styles.scrollItemIndex} >{idx+1}</Text>
                <Text style={styles.scrollItemName} >{idx == 0 ? '🏆 ' : ''}{it.name}</Text>
                
              </View>

              <View style={styles.scrollItemRight}>
                <Text style={styles.scrollItemScore} >{it.score}</Text>
              </View>

            </View>

          ))}

        </ScrollView>
        
      </View>
      <View style={styles.welcomePanelBar}> 
        <TouchableOpacity
          onPress={() => navigation.navigate('Welcome') }
        >
          <Text>🕹️ Reset, Main Page</Text>
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
  scrollWrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 15,
    paddingBottom: 60
  },
  scrollItem:{
    width : '100%',
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    backgroundColor: '#eee',
    borderRadius: 5,
    textAlign : 'center',
    padding: 10,
    marginBottom : 15,
  },
  scrollItemLeft : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
  },
  scrollItemRight : {},
  scrollItemIndex : {
    width: 25,
    height: 25,
    justifyContent : 'center',
    backgroundColor: '#999',
    borderRadius: 25,
    paddingTop : 3,
    fontWeight : 'bold',
    textAlign: 'center'
  },
  scrollItemName : {
    marginLeft : 10,
    fontWeight : 'bold',
  },
  scrollItemScore : {
    marginRight : 10,
    fontWeight : 'bold',
  },
  leaderBoard : {
    width : '100%',
    alignItems : 'center',
  },

  welcomePanelBar : {
  },
  title: {
  },
});

export default LeaderBoardScreen;
