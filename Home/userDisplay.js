/* eslint-disable react-hooks/exhaustive-deps */
import editData from "./editData";
import { useState, useEffect } from "react";
import TasksPosts from "./tasksPosts";
import OtherData from "./otherData";
import "../App.css";

function DisplayUsers(props) {
  useEffect(async () => {}, []);
  const mystyle = {
    padding: "5px 5px 5px 5px",
  };

  const tasksCompleted = (id) => {
    const found = props.tasks.filter((usr) => usr.userId === id).map((x) => x.completed);
    if (isActive) {
      if (found.includes(false)) {
        return "card bg-light align-items-center d-flex justify-content-center border border-danger col-6 colorRed";
      } else {
        return "card bg-light align-items-center d-flex justify-content-center border border-success col-6 colorRed";
      }
      //
    }
    if (!isActive) {
      if (found.includes(false)) {
        return "card bg-light align-items-center d-flex justify-content-center border border-danger col-6";
      } else {
        return "card bg-light align-items-center d-flex justify-content-center border border-success col-6";
      }
    }
  };
  const [isActive, setActive] = useState(false);

  const bakgColor = () => {
    setSelected(true);
    setActive(!isActive);
    setTaskVisible(!taskVisible);
  };

  const [taskVisible, setTaskVisible] = useState(false);
  const [oDataVisible, setoDataVisible] = useState(false);
  const [selected, setSelected] = useState(false);
  const deleteUser = () => {
    editData.Del(props.user.id, props.user.name);
    props.updateData(props.user, "delete");
  };

  const handleBlur = (e) => {
    // if the blur was because of outside focus
    // currentTarget is the parent element, relatedTarget is the clicked element
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setActive(false);
      setTaskVisible(false);
      setSelected(false);
    }
  };

  return (
    <div className="container" style={mystyle}>
      <div className="row" key={props.user.id} tabIndex="0" onBlur={(e) => handleBlur(e)}>
        <div className={tasksCompleted(props.user.id)}>
          <div className="">
            <div className="col">
              <div onClick={() => bakgColor()}>User ID : {props.user.id}</div>
              <div className="row">
                <div>
                  <input
                    type="text"
                    value={props.user.name}
                    onChange={(e) => {
                      props.updateData(e.target.value, "name");
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={props.user.email}
                    onChange={(e) => {
                      props.updateData(e.target.value, "email");
                    }}
                  />
                </div>
                <div style={mystyle}>
                  <input
                    type="button"
                    value="More"
                    className="btn border border-dark"
                    onMouseOver={() => (oDataVisible ? null : setoDataVisible(!oDataVisible))}
                    onClick={() => oDataVisible ? setoDataVisible(false) : setoDataVisible(true)}
                  />
                </div>
              </div>
              <div className=" " style={mystyle}>
                {oDataVisible && (
                  <OtherData
                    data={props.user}
                    updateAddress={(updates, updateField, street, city, zip) => props.updateData(updates, updateField, street, city, zip)}
                  />
                )}
              </div>
              <div className="row ">
                <div style={mystyle}>
                  <input
                    type="button"
                    className="col-2 btn border border-dark"
                    value="Update"
                    onClick={() => editData.Update(props.user.id, props.user.name, props.user.email)}
                  />
                  <input type=" button" className=" col-2 btn border border-dark" value="Delete" onClick={() => deleteUser()} />
                </div>
              </div>
              <br />
            </div>
            <br />
            <br />
          </div>
        </div>
        <div className=" col-6 right" style={{ zIndex: "1" }}>
          <div>
            {taskVisible && (
              <TasksPosts
                tasks={props.user.tasks}
                posts={props.user.posts}
                id={props.user.id}
                show={taskVisible}
                selected={selected}
                deSelect={(select) => setSelected(select)}
              />
            )}
          </div>
        </div>
        {/* <div className="col">Space</div> */}
      </div>
    </div>
  );
}
export default DisplayUsers;
