import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useGetFirebaseData = async (collectionName, queryName, dataFinded) => {
  // busco en mi DB con el email el usuario correspondiente creado anteriormente en register
  let usersCollection = collection(db, collectionName);
  let q = query(usersCollection, where(queryName, "==", dataFinded));
  const userInfo = await getDocs(q); //usamos getDocs y me devuelve un ARRAY.
  let userData = {
    ...userInfo.docs[0]?.data(), //esparso mi usuario ---> necesito el metodo data()
    id: userInfo.docs[0]?.id, // uso el ID.     ---> necesito acceder a la propiedad docs que me trae el id
  };

  //console.log("este es userData ", userData);

  return userData;
};

export default useGetFirebaseData;
