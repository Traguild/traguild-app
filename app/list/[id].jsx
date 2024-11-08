import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useSearchParams } from 'expo-router';

export default DetailsPage = () => {
  const { id } = useLocalSearchParams(); 

  return (
    <View>
      <Stack.Screen options={{ headerTitle: `Details #${id}` }} />
      <Text>My Details for: {id}</Text>
    </View>
  );
};