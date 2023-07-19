import { useEffect, useState } from "react"
import UsersDashboard from "./UsersDashboard"
import { db } from "../../../../firebase/firebaseConfig"
import { collection, getDocs } from "firebase/firestore"

const UsersDashboardContainer = () => {

    const [ users , setUsers ] = useState([])

    useEffect(()=>{
        (async()=>{
            let refDoc = collection(db , "users");
            let res = await getDocs(refDoc)
            let getUsers = res.docs.map((u)=>{
                return{
                     ...u.data(),
                     id:u.id
                }
            })
            setUsers(getUsers)
        })()
    })

  return (
    <UsersDashboard users={users}/>
  )
}

export default UsersDashboardContainer