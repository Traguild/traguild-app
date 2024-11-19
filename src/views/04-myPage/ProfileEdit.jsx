import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { FontAwesome5 } from "@expo/vector-icons";

// IMPORT LAYOUTS
import defaultLayout from "layouts/hoc/defaultLayout";

// IMPORT COMPONENTS
import RequestItem from "components/01-home/RequestItem";

const dummyData = [];
for (let i = 1; i <= 20; i++) {
  dummyData.push({ "request_idx": i, "user_idx": 1, "request_region": "창원", "request_title": `테스트 ${i}`, "request_content": `테스트 ${i} 내용`, "request_cost": "200,000", "request_state": (i % 2 == 0 ? "완료" : "모집 중"), "transaction_state": "대기중", "created_time": Date.now(), "updated_time": Date.now(), "is_deleted": 0, "applicant_idx": (i + 1) });
}

const ProfileEdit = () => {
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={dummyData}
        renderItem={({ item }) => <RequestItem item={item} />}
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

  floatingButton: {
    backgroundColor: theme['btn-floating'],

    position: "absolute",
    bottom: 25,
    right: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
});

export default defaultLayout(ProfileEdit);