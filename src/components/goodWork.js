import { useHistory } from "react-router-dom";
const GoodWork = () => {
    const history = useHistory();
    const breakTime = ()=>{
        history.push('/break');
    }
    return ( 
        <div className="goodWork">
            <h1>Good Work</h1>
            <button className="breakBut" onClick={breakTime}>
                Take a Break
            </button>
        </div>
     );
}
 
export default GoodWork;