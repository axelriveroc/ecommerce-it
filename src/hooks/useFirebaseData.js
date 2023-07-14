import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useFirebaseData = async (collectionName, queryName, dataFinded) => {

	// busco en mi DB con el email el usuario correspondiente creado anteriormente en register
	let usersCollection = collection(db, collectionName);
	let q = query(usersCollection, where(queryName, "==", dataFinded));
	const userInfo = await getDocs(q); //usamos getDocs y me devuelve un ARRAY.

	//desarmo ese usuario de mi DB. El id viene separado de mi user. Entonces lo tengo que armar en userData.
	const userData = {
		...userInfo.docs[0].data(), //esparso mi usuario ---> necesito el metodo data()
		id: userInfo.docs[0].id, // uso el ID.     ---> necesito acceder a la propiedad docs que me trae el id
	};

	return userData;
};

export default useFirebaseData;
