import firestore from "@react-native-firebase/firestore";
export const addDocument = async (collectionValue, data, customId) => {
  if (!customId) {
    await firestore().collection(collectionValue).add(data);
  } else {
    await firestore().collection(collectionValue).doc(customId).set(data);
  }
};
