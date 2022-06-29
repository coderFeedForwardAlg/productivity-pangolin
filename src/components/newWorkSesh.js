const NewWorkWesh = () => {
    return ( 
        <div className="new-work-sesh">
            <form>
                <label>How Long Do You Want To Work</label>
                <input placeholder="25" onChange={(e)=>{
                    //setFirstName(e.target.value);
                }}/>
                {/*<error>{ errors.duration?.type === "required" && "please enter a value"}</error>
                <error>{errors.duration?.type === "pattern" && "please only enter numbers"}</error> */}
            </form>
        </div>
     );
}
 
export default NewWorkWesh;