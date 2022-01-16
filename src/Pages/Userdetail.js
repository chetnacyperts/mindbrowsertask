import React, { useEffect, useState } from 'react'
import { fetchSingleCharacters } from '../Callapi/Helper';
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Userdetail = () => {
    const [singleUser, setSingleUser] = useState('');
    const usersing = useParams();
    const singleId = usersing.id;
    const navigate = useNavigate();

    const userSingleCharacter = async () => {
        try {
            const result = await axios.get(`https://rickandmortyapi.com/api/character/${singleId}`);
            setSingleUser(result.data);
            return result.data;
        } catch (error) {
            // console.log(error);
        }
    };

    useEffect(() => {
        userSingleCharacter();
    }, [])

    


    const addtoFavorite = () => {
        if (localStorage.getItem("item")) {
            try {
                let items = JSON.parse(localStorage.getItem("item"));
                items.push(singleUser);
                localStorage.setItem("item", JSON.stringify(items));
                localStorage.setItem("userfavorite", "User added successfully to Favorites");
                navigate('/Favorites');
            } catch {
                toast.error("Error in adding user to favorites");
            }
          }else{
            localStorage.setItem("item", "[]");
          }
      
    }

    return (
        <div>

            <div className="card" style={{ marginTop: "30px" }}>
                <div className="card-header">
                    User Detail
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="">
                            <div className="card-body">
                                <img src={singleUser?.image} alt="photo" style={{ height: "100px", width: "100px", borderRadius: "50px" }} />
                                <p className="card-text">Name : <b>{singleUser?.name}</b></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="">
                            <div className="card-body">
                                <p className="card-text">Gender : <b>{singleUser?.gender}</b></p>
                                <p className="card-text">Species : <b>{singleUser?.species}</b></p>
                                <p className="card-text">Status : <b>{singleUser?.status}</b></p>
                                <p className="card-text">Created : <b>{singleUser?.created}</b></p>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6" style={{ paddingBottom: "20px" }}>
                        <div className="container">   <button className="btn btn-success" onClick={() => addtoFavorite()}>Add to Favorites</button></div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Userdetail
