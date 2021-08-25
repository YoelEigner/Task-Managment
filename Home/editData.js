import utils from "../utilities/utils";

const Update = async (id, name, email) => {
    let arr = [name, email];
    let resp = await utils.Update(id, arr);
    if (resp.status === 200) {
      alert("User had been updated");
    } else {
      alert("Error! Please try agin later " + resp.status);
    }
  };
  const Del = async (id, name) => {
    let resp = await utils.Delete(id -1);
    if (resp.status === 200) {
      alert(name + " had been Deleted - server response:" + resp.status );
    } else {
      alert("Error! Please try agin later " + resp.status);
    }
  };

  export default { Del, Update};