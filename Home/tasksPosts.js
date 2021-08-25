/* eslint-disable react-hooks/exhaustive-deps */
import Context from "../context";
import { useState,useRef, useEffect  } from "react";
import "../App.css";
function TasksPosts(props) {
  const [newTask, setNewTask] = useState(false);
  const [allTasks, setAllTasks] = useState(true);
  const [newBody, setNewBody] = useState();

  const [postsDiv, setPostDiv] = useState(true);
  const [newpostsDiv, setNewPostDiv] = useState(false);
  const [newTitle, setTitle] = useState();
  const [isFocus, setFocus] = useState(false);
  const inputRef = useRef(null);

  const addNewItem = (newItem, allItems, setNewItem, setAllItems) => {
    !newItem && setNewItem(true);
    allItems && setAllItems(false);
  };
  const cancelUpdate = (newItem, allItems, setNewItem, setAllItems) => {
    newItem && setNewItem(false);
    !allItems && setAllItems(true);
    toggleFocus(!isFocus)
  }
  const updateStateTask = (cntxData) => {
    cntxData.addItem(cntxData.user[props.id - 1], props.id, cntxData.tasks[props.id - 1].length  , newTitle, "tasks", cntxData.tasks[props.id - 1].map(x=>x.id)[cntxData.tasks[props.id - 1].map(x=>x.id).length -1] );
    setNewTask(false);
    setAllTasks(true);
    toggleFocus(!isFocus)
  };
  const updateStatePost = (cntxData) => {
    cntxData.addItem(cntxData.user[props.id - 1], props.id, cntxData.tasks[props.id - 1].length, newTitle, "posts", cntxData.tasks[props.id - 1].map(x=>x.id)[cntxData.tasks[props.id - 1].map(x=>x.id).length -1], newBody );
    setNewPostDiv(false);
    setPostDiv(true);
    toggleFocus(!isFocus)
  };
  const mystyle = {
    padding: "10px",
  };
  useEffect(() => {
    if (isFocus) {
      inputRef.current.focus();
    }
  }, [isFocus]);
  const toggleFocus = () => {
    setFocus(!isFocus);
  }

  const newTaskDiv = (cntxData) => (
    <div className="container ">
      <div className="row border border-primary d-flex justify-content-center" style={mystyle}>
        Title : <input className="col-8" type="text" onChange={(e) => setTitle(e.target.value)} />
        <br />
        <div style={mystyle} className="  d-flex justify-content-center">
          <div style={mystyle}>
            <input className="col btn border-dark" type="button" value="Add" name="add"  onClick={() => updateStateTask(cntxData)} />
          </div>
          <div style={mystyle}>
            <input className="col btn border-dark" type="button" value="Cancel" onClick={() => cancelUpdate(newTask, allTasks, setNewTask, setAllTasks)} />
          </div>
        </div>
      </div>
      <br />
    </div>
  );

  const newPostDiv = (cntxData) => (
    <div className="container ">
      <div className="row border border-primary  justify-content-center" style={mystyle}>
        <div style={mystyle}>
          Title : <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div style={mystyle}>
          Body : <input type="text" onChange={(e) => setNewBody(e.target.value)} />
        </div>
        <br />
        <div className="  d-flex justify-content-center">
          <div style={mystyle}>
            <input className="col btn border-dark " type="button" value="Add" onClick={() => updateStatePost(cntxData)} />
          </div>
          <div style={mystyle}>
            <input className="col btn border-dark" type="button" value="Cancel" onClick={() => cancelUpdate(newpostsDiv, postsDiv, setNewPostDiv, setPostDiv)} />
          </div>
        </div>
      </div>
      <br />
    </div>
  );
  const allTasksDiv = (cntxData) =>
    cntxData.tasks[props.id - 1]
      .filter((x) => x.userId === props.id)
      .slice(0, 5)
      .map((x, index) => {
        return (
          <div className="container" style={mystyle} key={x.id}>
            <div   className="row border border-primary">
              <div   className="col-6 ">
                Title : {x.title} <br /> Completed : {String(x.completed)}
              </div>
              <div style={mystyle} className="col-6">
                <input
                  type="button"
                  className="btn border border-dark"
                  value="Mark Completed"
                  ref={inputRef}
                  onClick={() => cntxData.callBack(cntxData.user[props.id - 1], index , true, "tasks")}
                />
              </div>
            </div>
          </div>
        );
      });
  const allPostsDiv = (cntxData) =>
    cntxData.posts[props.id - 1]
      .filter((x) => x.userId === props.id)
      .slice(0, 5)
      .map((x) => {
        return (
          <div style={mystyle} key={x.id}>
            <div className="border border-primary " >
              <div>Title :</div>
              <div>{x.title}</div>
              <div>Body :</div>
              <div>{x.body}</div>
            </div>
          </div>
        );
      });

  return (
    <Context.Consumer>
      {(Context) => (
        <div className="container  " style={{zIndex : 1}}  >
          <div className=" border border-dark card  ">
            <div className="row">
              <h3 className=" col-6">Todos - User {props.id} </h3>
              <div className=" col-6">
                <br />
              </div>
              <br />
            </div>
            <div className="container" style={mystyle}>
              <div style={mystyle}>
                <div className="row">
                  <h4 className="col-8" >
                    Tasks
                  </h4>
                  <input type="button" className=" col-2 btn border border-dark" value="Add" onClick={() =>  addNewItem(newTask, allTasks, setNewTask, setAllTasks)} />
                  {newTask && newTaskDiv(Context)}
                  {allTasks && allTasksDiv(Context)}                
                </div>
              </div>

              <div className="container" style={mystyle}>
                <div>
                  <div className="row">
                    <h4 className="col-8">
                      Posts
                    </h4>
                    <input type="button" className=" col-2 btn border border-dark" value="Add" onClick={() => addNewItem(newpostsDiv, postsDiv, setNewPostDiv, setPostDiv)} />
                  </div>
                  {newpostsDiv && newPostDiv(Context)}
                  {postsDiv && allPostsDiv(Context)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Context.Consumer>
  );
}
export default TasksPosts;
