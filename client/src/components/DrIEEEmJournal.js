import { useContext, useEffect, useState } from "react";
import SignInSide from "./LoginScreen";
import SignUp from "./RegisterScreen";
import UsernameScreen from "./UsernameScreen.js";
import { AppContext } from '../AppContext.js';
import axios from "axios";
import HomePage from "./HomePage.js";

axios.defaults.withCredentials = true;

export default function DrIEEEmJournal(){
    const appState = useContext(AppContext);

    function deactivatePagesOtherThanActive(){
        switch(appState.activePage){
            case "SignIn":
                return(
                    <SignInSide></SignInSide>
                );
            case "SignUp":
                return(
                    <SignUp/>
                )
            case "UsernameScreen":
                return(
                    <UsernameScreen/>
                )
            case "HomePage":
                return(
                    <HomePage/>
                )
            default:
                return(
                    <SignInSide/>
                )

        }

    }

    return(
    <>
        {deactivatePagesOtherThanActive()}
    </>    
    );
}