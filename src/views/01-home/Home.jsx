import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'

// IMPORT LAYOUTS
import defaultLayout from "layouts/hoc/defaultLayout";

// IMPORT COMPONENTS
import RequestItem from "components/01-home/RequestItem";

const dummyData = [];
for(let i = 1; i <= 20; i++){
  dummyData.push({"request_idx": i, "user_idx": 1, "request_region": "창원", "request_title": `테스트 ${i}`,  "request_content": `테스트 ${i} 내용`, "request_cost": "200,000", "request_state": (i%2==0 ? "완료" : "모집 중"), "transaction_state": "대기중" , "created_time": Date.now(), "updated_time": Date.now(), "is_deleted": 0, "applicant_idx": (i+1)});
}

const Home = () => {
  return (
    <View style={ styles.container }>
      <FlatList
        style={{ width: "100%" }}
        data={dummyData}
        renderItem={({ item }) => <RequestItem item={ item } />} 
        keyExtractor={item => item.request_idx.toString()}
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