import './App.css';
import {useEffect, useState} from "react";
function Box() {
    return (
        <div className="Box">
            <form>
                <label for="username">Username</label> <br></br>
                <input type="text" id="username" name="uname"></input> <br></br>
                <label for="password">Password</label> <br></br>
                <input type="text" id="password" name="pwd"></input>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
      );

}
export default Box;