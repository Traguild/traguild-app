import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { defaultImg } from "resources/img/defaultImg";

const ChatListItem = ({ item, section, collapsed }) => {
  if (collapsed[section.title]) return null;
  return (
    // <Swipeable renderRightActions={() => renderRightActions(item.chatRoomId)}>
    <TouchableOpacity
      style={styles.chatItem}
      activeOpacity={0.6}
      onPress={() => navGo.to("ChatDetail", { chatData: item })}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={
              item.request_img
                ? {
                    uri: `https://traguild.kro.kr/api/requestInfo/getImage/${item.request_idx}`,
                  }
                : defaultImg.logo
            }
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 10,
            }}
          />
          <View>
            <Text style={styles.chatTitle}>
              {item.request_title} | {item.user_nickname}
            </Text>
            {item?.chat_detail && (
              <Text style={styles.chatMsg}>{item?.chat_detail ?? ""}</Text>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.chatTimeStamp}>
            {(item?.send_time ?? "").substr(0, 10)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    // </Swipeable>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  chatItem: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderBottomColor: "#ddd",
    borderBottomWidth: 0.5,
  },
  chatTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  chatMsg: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  chatTimeStamp: {
    fontSize: 12,
    color: "#666",
    marginBottom: 15,
  },
  swipeButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  swipeText: {
    color: "white",
    fontWeight: "bold",
  },
});
