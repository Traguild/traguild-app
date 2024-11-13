import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'

// IMPORT LAYOUTS
import defaultLayout from "../../layouts/hoc/defaultLayout";

// IMPORT COMPONENTS
import RequestItem from "../../components/01-home/RequestItem";

const dummyData = [];
for(let i = 1; i <= 50; i++){
  dummyData.push({"post_idx": i, "user_idx": 1, "post_name": `테스트 ${i}`,  "post_detail": `테스트 ${i} 내용`, "created_time": Date.now(), "updated_time": Date.now(), "is_deleted": 0});
}

const Home = () => {
  return (
    <View style={ styles.container }>
      <FlatList
        style={{ width: "100%" }}
        data={dummyData}
        renderItem={({ item }) => <RequestItem item={ item } />} 
        keyExtractor={item => item.post_idx.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
});

export default defaultLayout(Home);