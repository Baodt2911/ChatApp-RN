import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
const useFirestore = (collectionValue, condition, sortOrder, toLastMessage) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    /*condition
            {
                fieldName:'abc',
                operator:'=='.
                value:'uid'
            }
        sortOrder : {
            fieldValue:'createdAt'
            sort:'desc'
        }
        */
    let collectionRef = null;
    if (condition) {
      if (!condition.value || !condition.value.length) {
        return;
      }
      if (toLastMessage) {
        collectionRef = firestore()
          .collection(collectionValue)
          .where(condition.fieldName, condition.operator, condition.value)
          .orderBy(sortOrder.fieldValue, sortOrder.sort)
          .limitToLast(1); //Get last Message
      }
      if (typeof sortOrder != "object") {
        collectionRef = firestore()
          .collection(collectionValue)
          .where(condition.fieldName, condition.operator, condition.value);
      } else {
        collectionRef = firestore()
          .collection(collectionValue)
          .where(condition.fieldName, condition.operator, condition.value)
          .orderBy(sortOrder.fieldValue, sortOrder.sort);
      }
    }
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const document = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(document);
    });
    return unsubscribe;
  }, [collectionValue, condition, sortOrder, toLastMessage]);
  return data;
};
export default useFirestore;
