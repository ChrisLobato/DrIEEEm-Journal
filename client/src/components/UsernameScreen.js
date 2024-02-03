import { useEffect, useState, useContext } from "react";
import { AppContext } from "../AppContext";


export default function UsernameScreen(){
    const appState = useContext(AppContext);
    const [randomBool, setRandomBool] = useState(true);
    
    useEffect(()=>{
        //We use this to keep track of a variable when it gets changed

        console.log("randomBool was changed");

    },[randomBool])

    return(
        <div>
            {appState.currentUser.email}
        
            <input type="button" value = "toggle button state" onClick={()=>{setRandomBool(!randomBool)}}/>
            <p>{"Current state: " + randomBool}</p>

        </div>
        );

};