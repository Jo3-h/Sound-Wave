import React from "react";
import { useUser } from "../../context/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";

import "./css/Profile.css";

export default function Profile() {
  const { user, login, logout, updateUserDetails } = useUser();
  const [updateImage, setUpdateImage] = useState(false);
  const [formData, setFormData] = useState({
    id: user?.id || 0,
    profile_image: "",
    profile_image_preview: "", // Add a field for the image preview URL
    firstName: user?.firstName,
    lastName: user?.lastName,
    username: user?.username,
    email: user?.email,
    password: "",
    password2: "",
  });

  useEffect(() => {
    console.log("User: ", user);
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        profile_image: "",
        profile_image_preview: "", // Initialize the preview URL
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        password: "",
        password2: "",
      });
    }
  }, [user]);

  const handleImageError = (e) => {
    e.target.src = "/profile_pictures/default-profile-pic.jpg";
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        profile_image: file,
        profile_image_preview: previewUrl,
      });
      setUpdateImage(true);
      console.log("Image uploaded and preview updated");
    }
  };

  const validateUsername = async (username) => {
    if (!username) {
      console.log("No username provided");
      return false;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/users/check-username",
        { username }
      );
      return response.data.available;
    } catch (error) {
      console.error("Error validating username: ", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationFlags = {
      usernameValid: false,
    };

    validationFlags.usernameValid =
      (await validateUsername(formData.username)) ||
      formData.username === user.username;

    // Validate form data
    if (validationFlags.usernameValid) {
      const formDataToSend = new FormData();
      formDataToSend.append("id", formData.id);
      formDataToSend.append("firstName", formData.firstName || "");
      formDataToSend.append("lastName", formData.lastName || "");
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("password2", formData.password2);
      if (formData.profile_image) {
        formDataToSend.append("profile_image", formData.profile_image);
      }
      axios
        .post("http://localhost:3001/users/update-user", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log("User updated: ", response.data);
          updateUserDetails(response.data.user);
        })
        .catch((error) => {
          console.error("Error updating user: ", error);
        });

      console.log("Form submitted successfully:", formData);
    }
  };

  if (!user) {
    return <>Error User Unknown</>;
  }

  return (
    <>
      <div className="content-container">
        <div className="profile-container">
          <h3 className="profile-label">PROFILE</h3>
          <form className="form-container">
            {updateImage ? (
              <img
                className="user-profile-picture-preview"
                src={formData.profile_image_preview}
                alt="User Profile"
                onError={handleImageError}
              />
            ) : (
              <img
                className="user-profile-picture-preview"
                src={`/profile_pictures/${user.profile_pic}`}
                alt="User Profile"
                onError={handleImageError}
              />
            )}
            <label>Profile Image: </label>
            <input
              type="file"
              name="profile_image"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label>First Name: </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <label>Last Name: </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            <label>Username: </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </form>
          <button className="save-details-button" onClick={handleSubmit}>
            SAVE DETAILS
          </button>
        </div>
      </div>
    </>
  );
}
