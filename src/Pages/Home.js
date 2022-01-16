import React, { useEffect, useState } from 'react'
import '../App.css';
import { fetchCharacters } from '../Callapi/Helper';
import { Link } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const Home = () => {
  const [allCharacter, setAllcharacter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const userCharacters = async () => {
    let myData = await fetchCharacters();
    // console.log("myData", myData)
    setAllcharacter(myData.results);
  };

  useEffect(() => {
    userCharacters();
  }, [])

  return (
    <div className="container mt-5 px-2">
      <div className="mb-2 d-flex justify-content-between align-items-center">

        <div className="px-2"> <span>Search:</span> </div>
        <div className="position-relative"> <span className="position-absolute search"><i className="fa fa-search" /></span> <input className="form-control w-100" placeholder="Search by name, species, location, gender" onChange={event => { setSearchTerm(event.target.value) }} /> </div>
      </div>
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

              {allCharacter.filter((item) => {
                if (searchTerm == "") {
                  return item
                } else if (
                  item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.gender.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return item
                }
              }).map((item) => (
                <tr key={item.id}>
                  <td key={item.id}>{item?.id}</td>
                  <td key={item.id}><Link to={`/Userdetail/${item?.id}`}>{item?.name}</Link></td>
                  <td key={item.id}><i className="fa fa-check-circle-o green" /><span className="ms-1">{item?.status}</span></td>
                  <td key={item.id}><img src={item?.image} width={25} style={{ borderRadius: "15px" }} /> {item?.species}</td>
                  <td key={item.id}>{item?.location.name}</td>
                  <td key={item.id}><span className="fw-bolder">{item?.gender}</span> <i className="fa fa-ellipsis-h ms-2" /></td>
                  <td key={item.id}><Link to={`/Userdetail/${item?.id}`}><button className="btn btn-primary">View</button></Link></td>
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
    </div>
  )
}

export default Home
