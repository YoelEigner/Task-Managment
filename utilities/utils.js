import axios from "axios";

const GetUsers = async () => {
  return await axios.get("https://jsonplaceholder.typicode.com/users");
};
const GetPosts = async () => {
  return await axios.get("https://jsonplaceholder.typicode.com/posts");
};

const GetToDos = async () => {
  return await axios.get("https://jsonplaceholder.typicode.com/todos");
};
const GetToDosUser = async (id) => {
  return await axios.get("https://jsonplaceholder.typicode.com/todos?userId=" + id);
};
const Update = (id, obj) => {
  return axios.put("https://jsonplaceholder.typicode.com/users/" + id, obj);
};

const Delete = (id) => {
  return axios.delete("https://jsonplaceholder.typicode.com/users/" + id);
};
const AddUser = (name, email)=>{
  return axios.post("https://jsonplaceholder.typicode.com/users/?name=" + name + "&email=" + email)
}

export default { GetToDos, GetPosts, GetUsers, Update, Delete, GetToDosUser, AddUser };
