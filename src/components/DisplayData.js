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
            {users.map( (duration) => {return <div> how long you worked in each work session: {duration.duration} </div>})}
        </div>
     );
}
 
export default DisplayData;