// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import React, { useState } from "react";

// // IMPORT RESOURCES
// import { theme } from "resources/theme/common";
// import { FontAwesome5 } from "@expo/vector-icons";

// // IMPORT LAYOUTS

// // IMPORT COMPONENTS
// import QuestListItem from "src/components/04-myPage/QuestListItem";

// const dummyData = []; //내가 지원한 더미
// // const dummyData2 = []; //내가 모집중인 더미
// for (let i = 1; i <= 20; i++) {
//   const states = ['대기', '완료', '반려'];

//   const formattedDate = new Date(Date.now())
//     .toLocaleDateString("ko-KR", {
//       year: "2-digit",
//       month: "2-digit",
//       day: "2-digit",
//     })
//     .slice(0, -1)
//     .replace(/\./g, "-")
//     .trim();

//   dummyData.push({
//     request_idx: i,
//     user_idx: 1,
//     request_state_region: "경상남도",
//     request_city_region: "창원시",
//     request_title: `테스트 ${i}`,
//     request_content: `테스트 ${i} 내용`,
//     request_cost: "200,000",
//     request_state: i % 2 == 0 ? "완료" : "모집 중",
//     applicant_idx: states[Math.floor(Math.random() * states.length)],
//     transaction_state: "대기중",
//     // "created_time": Date.now(),
//     // "updated_time": Date.now(),
//     created_time: formattedDate,
//     updated_time: formattedDate,
//     is_deleted: 0,
//     // applicant_idx: i + 1,
//     // view_option: i % 2 == 0 ? "mine" : "yours",
//   });
// }

// // for (let i = 1; i <= 20; i++) {
// //   const formattedDate = new Date(Date.now())
// //     .toLocaleDateString("ko-KR", {
// //       year: "2-digit",
// //       month: "2-digit",
// //       day: "2-digit",
// //     })
// //     .slice(0, -1)
// //     .replace(/\./g, "-")
// //     .trim();

// //   dummyData2.push({
// //     request_idx: i,
// //     user_idx: 1,
// //     request_state_region: "경상남도",
// //     request_city_region: "창원시",
// //     request_title: `테스트 ${i}`,
// //     request_content: `테스트 ${i} 내용`,
// //     request_cost: "200,000",
// //     request_state: i % 2 == 0 ? "완료" : "모집 중",
// //     applicant_idx: Math.floor(Math.random() * (3 - 1 + 1)) + 1,
// //     transaction_state: "대기중",
// //     created_time: formattedDate,
// //     updated_time: formattedDate,
// //     is_deleted: 0,
// //     applicant_idx: i + 1,
// //     view_option: i % 2 == 0 ? "mine" : "yours",
// //   });
// // }

// const QuestList = () => {

//   const [selectedState, setSelectedState] = useState('전체');

//   const filteredData = selectedState === '전체'
//     ? dummyData
//     : dummyData.filter(item => item.request_state === selectedState);

//   return (
//     <View style={styles.container}>

//       <View style={styles.filterContainer}>
//         {['전체', '대기', '완료', '반려'].map((state) => (
//           <TouchableOpacity
//             key={state}
//             style={[
//               styles.filterButton,
//               selectedState === state && styles.activeFilterButton,
//             ]}
//           // onPress={() => setSelectedState(state)}
//           >
//             <Text style={styles.filterButtonText}>{state}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <FlatList
//         style={{ width: "100%" }}
//         data={dummyData}
//         renderItem={({ item }) => <QuestListItem item={item} />}
//         keyExtractor={(item) => item.request_idx.toString()}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   floatingButton: {
//     backgroundColor: theme["btn-floating"],

//     position: "absolute",
//     bottom: 25,
//     right: 25,
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 25,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 3,
//       height: 5,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   btnText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "500",
//     marginLeft: 10,
//   },

//   filterContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//     paddingVertical: 10,
//     backgroundColor: "#f0f0f0",
//   },
//   //필터 버튼
//   filterButton: {
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 5,
//     backgroundColor: "#e0e0e0",
//   },

//   activeFilterButton: {
//     backgroundColor: "#4CAF50", // 선택된 버튼 색상
//   },

//   filterButtonText: {
//     color: "#000",
//     fontWeight: "bold",
//   },

// });

// export default QuestList;


import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

// IMPORT COMPONENTS
import QuestListItem from "src/components/04-myPage/QuestListItem";

const dummyData = []; // 내가 지원한 더미
const states = ['대기', '완료', '반려'];

for (let i = 1; i <= 20; i++) {
  const formattedDate = new Date(Date.now())
    .toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })
    .slice(0, -1)
    .replace(/\./g, "-")
    .trim();

  dummyData.push({
    request_idx: i,
    user_idx: 1,
    request_state_region: "경상남도",
    request_city_region: "창원시",
    request_title: `테스트 ${i}`,
    request_content: `테스트 ${i} 내용`,
    request_cost: "200,000",
    request_state: states[Math.floor(Math.random() * states.length)],
    applicant_idx: states[Math.floor(Math.random() * states.length)],
    transaction_state: states[Math.floor(Math.random() * states.length)],
    created_time: formattedDate,
    updated_time: formattedDate,
    is_deleted: 0,
  });
}

const QuestList = () => {
  // 현재 선택된 applicant_idx를 관리하는 state
  const [selectedApplicantIdx, setSelectedApplicantIdx] = useState(null);

  // 선택된 applicant_idx에 따라 데이터 필터링
  const filteredData = selectedApplicantIdx === null
    ? dummyData
    : dummyData.filter(item => item.applicant_idx === selectedApplicantIdx);

  return (
    <View style={styles.container}>
      {/* applicant_idx 필터 버튼들 */}
      <View style={styles.filterContainer}>
        {[null, '대기', '완료', '반려'].map((idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.filterButton,
              selectedApplicantIdx === idx && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedApplicantIdx(idx)}
          >
            <Text style={styles.filterButtonText}>
              {idx === null ? '전체' : `${idx}`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 필터링된 데이터를 FlatList로 표시 */}
      <FlatList
        style={{ width: "100%" }}
        data={filteredData}
        renderItem={({ item }) => <QuestListItem item={item} />}
        keyExtractor={(item) => item.request_idx.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // 필터 버튼 스타일
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
  },

  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
  },

  activeFilterButton: {
    backgroundColor: "#4CAF50", // 선택된 버튼 색상
  },

  filterButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default QuestList;
