import React, { useEffect,useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
// css 
import { auth, db, logout } from "../firebase-config";
import { query, collection, getDocs, where } from "firebase/firestore";

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const history = useHistory();
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("an error occured while fetching user data");
        };
    }
    useEffect( () => {
        if (loading) return;
        if (!user) return history.push("login");
        fetchUserName();
    }, [user, loading]);
    return ( 
        <div className="dashboard">
            <div className="dashboard-container">
                Logged in as <div>{name}</div>
                <div>{user?.email}</div>
                <button className="dashboard-btn" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
     );
}
 
export default Dashboard;