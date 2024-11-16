import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// IMPORT LAYOUTS
import defaultLayout from "layouts/hoc/defaultLayout";

// IMPORT COMPONENTS
import PostItem from "components/02-community/PostItem";

const dummyData = [];
const Logo = require("resources/img/icon.png");
for(let i = 1; i <= 50; i++){
  if (i % 2 == 0) {
    dummyData.push({"post_idx": i, "user_idx": 1, "post_name": `테스트 ${i}`,  "post_detail": `내용 확인 ${i} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt `, "created_time": Date.now(), thumb_img: Logo, "updated_time": Date.now(), "is_deleted": 0});
  } else {
    dummyData.push({"post_idx": i, "user_idx": 1, "post_name": `테스트 ${i}`,  "post_detail": `내용 확인 ${i} Lorem ipsum dolor sit amet,`, "created_time": Date.now(), "updated_time": Date.now(), "is_deleted": 0});
  }
}

const Community = () => {
  return (
    <View style={ styles.container }>
      <FlatList
        style={{ width: "100%" }}
        data={dummyData}
        renderItem={({ item }) => <PostItem item={ item } />} 
        keyExtractor={item => item.post_idx.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
});

export default defaultLayout(Community);