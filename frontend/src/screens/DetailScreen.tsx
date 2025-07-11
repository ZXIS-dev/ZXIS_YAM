import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type { RootStackParamList } from 'src/navigation/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen: React.FC<Props> = ({route, navigation}) => {
  const {foodId} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Screen</Text>
      <Text style={styles.id}>foodId: {foodId}</Text>
    </View>
  );
}
export default DetailScreen
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 20},
  id : {fontSize:20},
});
