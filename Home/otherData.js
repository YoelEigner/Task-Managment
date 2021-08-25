import "../App.css";
import { useState, useEffect } from "react";

function OtherData(props) {
  const [newData, setNewData] = useState({ street: "", city: "", zip: "" });

  useEffect(() => {
    props.updateAddress("NA", "address", newData.street, newData.city, newData.zip);
  }, [newData]);
  useEffect(() => {
    setNewData({ ...newData, street: props.data.address.street, city: props.data.address.city, zip: props.data.address.zipcode });
  }, []);
  let otherData = (
    <form>
      <div>
        <br />
        <div className=" card row align-items-center d-flex justify-content-center">
        More Data
        <br />
          <label>Street : </label>
          <input className="col-6 " type="text" value={props.data.address.street} onChange={(e) => setNewData({ ...newData, street: e.target.value })} />
          <br />
          <label>City : </label>
          <input className=" col-6" type="text" value={props.data.address.city} onChange={(e) => setNewData({ ...newData, city: e.target.value })} />
          <br />
          <label>Zip Code : </label>
          <input className=" col-6" type="text" value={props.data.address.zipcode} onChange={(e) => setNewData({ ...newData, zip: e.target.value })} />
          <br />
        </div>
      </div>
    </form>
  );
  return <div className="container">{otherData}</div>;
}
export default OtherData;
