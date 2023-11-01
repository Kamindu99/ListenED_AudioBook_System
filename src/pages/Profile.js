import axios from "axios";
import React, { useEffect, useState } from "react";

function Profile() {
  const userid = 9;
  const [UserDetails, setUserDetails] = useState(null);

  const retrieveUserDetailsById = (id) => {
    axios
      .get(`https://listened.onrender.com/usermanagement/${id}/`)
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((error) => {
        console.error("Error fetching UserDetails by ID:", error);
      });
  };

  useEffect(() => {
    retrieveUserDetailsById(userid);
  }, [userid]);

  return (
    <div className="mt-5">
      <h1 className="container text-center">
        {UserDetails?.name?.split(" ")[0]}ගේ දත්ත පිටුව
      </h1>
      <br /> <br />
      <div className="container mb-5">
        <div className="row cardsss ">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div class="card ">
              <div class="row no-gutters">
                <div class="col-md-5">
                  <img
                    style={{ height: "100%" }}
                    src="https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
                    class="card-img"
                    alt="..."
                  />
                </div>
                <div class="col-md-7">
                  <div class="card-body">
                    <h1 class="card-title" style={{ fontSize: "50px" }}>
                      {UserDetails?.name}
                    </h1>
                    <br /> <br />
                    <h1 class="card-text">Mobile : {UserDetails?.mobile}</h1>
                    <h1 class="card-text">Email : {UserDetails?.email}</h1>
                    <h1 class="card-text">
                      Study Area : {UserDetails?.studyarea}
                    </h1>
                    <br /> <br /> <br />
                    <br />
                    <br />
                    <button
                      class="card-text btn btn-success w-100"
                      style={{ fontSize: "50px" }}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
