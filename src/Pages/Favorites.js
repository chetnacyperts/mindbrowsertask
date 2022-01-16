import React, { useState, useEffect } from 'react'
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const Favorites = () => {
  const [allCharacter, setAllcharacter] = useState('');


  const userCharacters = async () => {
    let myData = await JSON.parse(localStorage.getItem("item"));
    setAllcharacter(myData);
  };

  useEffect(() => {
    userCharacters();
    if (localStorage.getItem("userfavorite") != '') {
      toast.success(localStorage.getItem("userfavorite"));
      localStorage.removeItem("userfavorite");
    }
  }, [])


  const removeItem = (id) => {
    try {
      var retrievedObj = JSON.parse(localStorage.getItem("item"));
      const idToRemove = id;

      const filteredPeople = retrievedObj.filter((item) => item.id !== idToRemove);
      localStorage.setItem("item", JSON.stringify(filteredPeople));
      userCharacters();
      toast.success("User removed successfully from favorites");
    } catch {
      toast.error("Error in user remove from favorites");
    }
  }

  return (
    <div className="container mt-5 px-2">

      <div className="table-responsive">
        <table className="table table-striped table-hover" style={{ border: "0.5px solid #ccc9c9" }}>
          <thead>
            <tr className="bg-light">
              <th scope="col" width="5%">Sir No.</th>
              <th scope="col" width="5%">Name</th>
              <th scope="col" width="20%">Status</th>
              <th scope="col" width="10%">Species</th>
              <th scope="col" width="20%">Location</th>
              <th scope="col" width="20%">Gender</th>
              <th scope="col" width="20%">Action</th>
            </tr>
          </thead>
          {allCharacter ?
            <tbody>

              {allCharacter.map((item) => (
                <tr key={item.id}>
                  <td key={item.id}>{item?.id}</td>
                  <td key={item.id}>{item?.name}</td>
                  <td key={item.id}><i className="fa fa-check-circle-o green" /><span className="ms-1">{item?.status}</span></td>
                  <td key={item.id}><img src="https://i.imgur.com/VKOeFyS.png" width={25} /> {item?.species}</td>
                  <td key={item.id}>{item?.location.name}</td>
                  <td key={item.id}><span className="fw-bolder">{item?.gender}</span> <i className="fa fa-ellipsis-h ms-2" /></td>
                  <td key={item.id}><button className="btn btn-info" onClick={() => removeItem(item?.id)}>Remove from Favorite</button></td>
                </tr>
              ))}


            </tbody> :
            <tbody>
              <tr>
                <td>No data Found</td>
              </tr>
            </tbody>
          }

        </table>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Favorites
