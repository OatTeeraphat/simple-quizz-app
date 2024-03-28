import AsyncStorage from '@react-native-async-storage/async-storage';

type LeaderBoardSchema = {
    id : string
    name : string
    score: number,
}

export const saveToLeaderBoardStorage = async (item : LeaderBoardSchema) => {

    try {
        const leaderBoard = await loadLeaderBoardFromStorage();
        leaderBoard.push(item)
        await AsyncStorage.setItem('leaderBoard', JSON.stringify(leaderBoard));
      
    } catch (error) {
        console.error('Error saving leaderBoard to AsyncStorage:', error);
    }

};

export const loadLeaderBoardFromStorage = async () => {

    try {

        const leaderBoard = await AsyncStorage.getItem('leaderBoard');
        return leaderBoard !== null ? JSON.parse(leaderBoard) : [];

    } catch (error) {

        console.error('Error loading leaderBoard from AsyncStorage:', error);
        return [];

    }
  
};