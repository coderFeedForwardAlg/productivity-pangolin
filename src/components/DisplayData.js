import { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';
import {db} from '../firebase-config'
import {collection, getDocs} from 'firebase/firestore'

const DisplayData = () => {
    const [users, setUsers] = useState([]);
  const userCollection = collection(db, "productivityData");
  
  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(userCollection); 
        // the ... is the spreder 
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id}) ))
    };
    getUsers();
  
  }, []);

    return ( 
        <div className='display-data'>
            <h1>react firebase project</h1>
            {users.map( (user) => {return <div>id: {user.userID}</div>} )  }
            {users.map( (duration) => {return <div> how long you worked: {duration.duration} </div>})}
        </div>
     );
}
 
export default DisplayData;