import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import useFirestore from "../../hooks/useFirestore";
const ShowMember = ({ route }) => {
  const { members } = route.params;
  const conditionMembers = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      value: members,
    };
  }, [members]);
  const sortOderMembers = useMemo(() => {
    return {
      fieldValue: "displayName",
      sort: "desc",
    };
  }, []);
  const dataMembers = useFirestore(
    "users",
    conditionMembers,
    sortOderMembers,
    false
  );
  const renderMembers = useCallback(
    ({ item }) => (
      <View style={styles.itemMember}>
        {item.photoURL?.length === 1 ? (
          <View style={styles.imageMember}>
            <Text style={styles.textImage}>{item.photoURL}</Text>
          </View>
        ) : (
          <Image
            source={{ uri: `${item.photoURL}` }}
            resizeMode="cover"
            style={styles.imageMember}
          />
        )}
        <Text style={styles.nameMember}>{item.displayName}</Text>
      </View>
    ),
    []
  );
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>
        Tất cả thành viên{" "}
        <Text style={{ fontSize: 24, color: "#333" }}>
          ({dataMembers?.length})
        </Text>
      </Text>
      {!dataMembers ? (
        <ActivityIndicator color="gray" />
      ) : (
        <FlatList data={dataMembers} renderItem={renderMembers} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    gap: 30,
    paddingBottom: 50,
  },
  textHeader: {
    fontSize: 30,
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 20,
    fontFamily: "SairaCondensed-SemiBold",
  },
  itemMember: {
    width: "100%",
    height: 60,
    backgroundColor: "#dadada80",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  imageMember: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#9DB2BF80",
    justifyContent: "center",
    alignItems: "center",
  },
  textImage: {
    fontFamily: "SairaCondensed-SemiBold",
    fontSize: 26,
  },
  nameMember: {
    fontSize: 20,
    fontFamily: "SairaCondensed-Medium",
  },
});
export default ShowMember;
