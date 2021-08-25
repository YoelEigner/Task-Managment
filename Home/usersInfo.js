/* eslint-disable react-hooks/exhaustive-deps */
import utils from "../utilities/utils";
import { useEffect, useState } from "react";
import DisplayUsers from "./userDisplay";
import AddUser from "./addUser";
import Context from "../context";
import { userTemplate } from "../utilities/users";

function Users() {
  const [searchVal, setSearchVal] = useState("");
  const [tasks, setTasks] = useState([{}]);
  const [newUsr, setNewUsr] = useState();
  const [user, setUser] = useState(userTemplate);
  const [userFiltered, setUserFiltered] = useState(userTemplate);
  useEffect(async () => {
    getData();
  }, []);

  //Get New Data on load
  const getData = async () => {
    let tasks = await utils.GetToDos();
    let userData = await utils.GetUsers();
    let userPosts = await utils.GetPosts();
    setTasks(tasks.data);
    setSearchVal("");

    let id = userData.data.map((x) => {
      return x.id;
    });

    id.forEach((id) => {
      let tsk = tasks.data.filter((x) => {
        return x.userId === id;
      });
      userData.data[id - 1] = { ...userData.data[id - 1], tasks: tsk };
    });

    id.forEach((id) => {
      let post = userPosts.data.filter((x) => {
        return x.userId === id;
      });
      userData.data[id - 1] = { ...userData.data[id - 1], posts: post };
    });
    setUser([...userData.data]);
    setUserFiltered([...userData.data]);
  };

 
  // useEffect(() => {
  //   user.filter((x) => x.name.includes(searchVal))
  //   // console.log(user)
  //   //  let filtered = user.map((x) => x).filter((x) => x.name.includes(searchVal));
  //   // console.log(filtered)
  //   // searchVal === "" ? getData() : setUser(filtered);
  // }, [searchVal]);

  const setNewData = (currentUser, newData, itemToUpdate, street, city, zip) => {
    const temp = [...user];
    if (itemToUpdate === "address") {
      temp[currentUser.id - 1] = { ...currentUser, address: { street: street, city: city, zipcode: zip } };
    } else if (itemToUpdate === "delete") {
      let index = temp.findIndex((x) => x.name === currentUser.name);
       temp.splice(index, 1)
    } else {
      temp[currentUser.id - 1] = { ...currentUser, [itemToUpdate]: newData };
    }
    setUser(temp);
  };
  const markDone = (x, postId) => {
    let temp = [...user];
    temp[[x.id - 1]].tasks[[postId]].completed = "true";
    setUser(temp);
  };
  const addNewItem = (x, userId, taskId, updates, itemToUpdate, newTaskId, bodyUpdate) => {
    let temp = [...user];
    itemToUpdate === "tasks"
      ? (temp[userId - 1].tasks[taskId] = { userId: userId, id: newTaskId + 1, title: updates, completed: true })
      : (temp[userId - 1].posts[taskId] = { userId: userId, id: newTaskId + 1, title: updates, body: bodyUpdate });
    setUser(temp);
  };

  const addUser = (newId, name, email) => {

    let newUser = userTemplate.map((x) => ({
      ...x,
      id: newId,
      name: name,
      email: email,
      tasks: [{ userId: newId, id: 1, title: "", completed: "" }],
      posts: [{ userId: newId, id: 1, title: "", body: "" }],
    }));
    setUser([...user, ...newUser]);
  };

  return (
    <Context.Provider
      value={{
        tasks: user.map((x) => x.tasks),
        posts: user.map((x) => x.posts),
        user: user,
        addItem: (x, userId, taskId, updates, itemToUpdate, newTaskId, bodyUpdate) =>
          addNewItem(x, userId, taskId, updates, itemToUpdate, newTaskId, bodyUpdate),
        callBack: (x, postId, updates, itemToUpdate) => markDone(x, postId, updates, itemToUpdate),
      }}
    >
      <div className="container">
        <br />
        <div className="row-fluid"></div>
        <div className="col">
          <div className="row">
            <div className="col">
              <label>Search User : </label>
              <input type="text" className="col-4" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} />
            </div>
            <div className="col">
              <input className="col-4" type="button" value="Add User" onClick={() => setNewUsr(!newUsr)} />
            </div>
            {newUsr ? (
              <AddUser callback={(newUserId, name, email) => addUser(newUserId, name, email)} hideDiv={(newUserHide) => setNewUsr(newUserHide)} />
            ) : null}
          </div>
        </div>
        <br />
        <br />
        <div className="col">
          {user.filter((x) => x.name.match(searchVal.charAt(0).toUpperCase())).map((x) => {
            return (
              <div className="container" key={x.id}>
                <div className="row">
                  <div className="col">

                     
                    <DisplayUsers
                      updateData={(updates, itemToUpdate, street, city, zip) => setNewData(x, updates, itemToUpdate, street, city, zip)}
                      user={x}
                      filter={user}
                      tasks={tasks}
                      searchVal={searchVal}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Context.Provider>
  );
}
export default Users;
