import React from "react";
import { useEffect, useState } from "react";
import EditProfilePostCard from "./EditProfilePostCard";
import "./EditProfile.css";

function EditProfile({ user, setUser }) {
  let initialName = { name: "" };
  let initialImage = { profile_image: "" };
  const [posts, setPosts] = useState([]);
  const [editNameClicked, setEditNameClicked] = useState(true);
  const [editProfileImageClicked, setProfileImageClicked] = useState(false);
  const [userName, setuserName] = useState(initialName);
  const [userImage, setUserImage] = useState(initialImage);

  useEffect(() => {
    // let token = sessionStorage.getItem('jwt')
    if (user.id) {
      fetch(`http://127.0.0.1:3000/userposts/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
        });
    }
  }, [user.id]);

  // CHANGE USERNAME
  function handleNameEditClick() {
    setEditNameClicked((prev) => !prev);
  }

  function handleNameChange(e) {
    setuserName({
      ...userName,
      [e.target.name]: e.target.value,
    });
    console.log(userName.name);
  }

  function handleNameChangeSubmit(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:3000/updatename", {
      method: "PATCH",
      headers: {
        token: sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName.name }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        user.name = data.name;
        setuserName(initialName);
        setEditNameClicked(true);
      });
  }

  // EDIT USER IMAGE

  function handleImageEditClick() {
    setProfileImageClicked((prev) => !prev);
  }

  function handleUserImageChange(e) {
    setUserImage({
      ...userImage,
      [e.target.name]: e.target.value,
    });
    console.log(userImage);
  }

  function handleProfileImageSubmit(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:3000/updateimage", {
      method: "PATCH",
      headers: {
        token: sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profile_image: userImage.profile_image }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          ...user,
          profile_image: data.profile_image,
        });
        setUserImage(initialImage)
        setProfileImageClicked(false)
      });
  }

  return (
    <div className="profile-divv">
      <div className="profile-info">
        <div className="user-profile-image-div">
          <img src={user.profile_image} />
          <i onClick={handleImageEditClick} className="fa fa-pencil-square"></i>
          {editProfileImageClicked ? (
            <form
              onSubmit={handleProfileImageSubmit}
              className="image-change-form"
            >
              <input
                name="profile_image"
                onChange={handleUserImageChange}
                type="text"
                value={userImage.profile_image}
                placeholder="Enter New Profile Image"
              />
              <input type="submit" value="Submit" />
            </form>
          ) : (
            ""
          )}
        </div>

        <div className="user-profile-info">
          <div className="profile-editt">
            {editNameClicked ? (
              <h1>{user.name}</h1>
            ) : (
              <form onSubmit={handleNameChangeSubmit}>
                <input
                  type="text"
                  placeholder="New Name"
                  onChange={handleNameChange}
                  name="name"
                  value={userName.name}
                />
                <input type="submit" value="Submit" />
              </form>
            )}
            <i
              onClick={handleNameEditClick}
              className="fa fa-pencil-square"
            ></i>
          </div>

          <div className="posts-followw">
            <h3>{posts.length} Posts</h3>
            <h3>... Followers</h3>
            <h3>... Following</h3>
          </div>
          <div className="bio">
            <h4>{user.name}</h4>
            <h4>Bio {user.bio}</h4>
          </div>
        </div>
      </div>
      <div className="all-edit-posts-div">
        {posts.map((el, i) => {
          return <EditProfilePostCard post={el} key={i} />;
        })}
      </div>
    </div>
  );
}

export default EditProfile;
