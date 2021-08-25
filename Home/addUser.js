import utils from "../utilities/utils";
import { useState } from "react";
import { useEffect } from "react";

function AddUser(props) {
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const add = async () => {
    console.log(userInfo.name);

    if (userInfo.name && userInfo.email !== "") {
      let resp = await utils.AddUser(userInfo.name, userInfo.email);
      if (resp.status === 201) {
        props.callback(resp.data.id, userInfo.name, userInfo.email);
        alert("User " + userInfo.name + " had been added!");
        props.hideDiv(false);
      }
    } else {
      alert("Please Enter a name!");
    }
  };
  const mystyle = {
    padding: "5px 5px 5px 5px",
  };
  useEffect(() => {});
  return (
    <div className="container-fluid d-flex flex-row-reverse " >
      <br />
      <div className="col border border-dark" style={mystyle}>
        <div style={mystyle}>
          Name : <input type="text" onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
          <br />
        </div>
        <div style={mystyle}>
          Email : <input type="text" onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
          <br />
        </div>
        <input type="button" value="Add User" onClick={() => add()} />
      </div>
    </div>
  );
}

export default AddUser;
