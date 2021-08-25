import { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css"


function Home (){
    return (
        <div className="centerBody">
          <ul>
          <Link to="/users/" target="_blank"><button className="btnRouter btnRouter-lg">User Tasks</button></Link><br/><br/>
          <Link ><button className="btnRouter btnRouter-lg">More Coming soon...</button></Link><br/>
          </ul>
        </div>
      );
}
export default Home
