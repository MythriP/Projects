import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import Container from "../components/Container";
import { ReactComponent as PersonIcon } from "../assets/person.svg";
import "./EditProfilePage.css";
import { setProfileImage } from "../utils/actions/post";
import Button from "../components/Button";

const EditProfilePage = ({ user, userProfileImage }) => {
  console.log(user);
  const [userProfilePic, setUserProfilePic] = useState(userProfileImage);
  const [formData, setFormData] = useState({
    profile_pic: userProfilePic,
    first_name: user.first_name,
    last_name: user.last_name,
    website: "",
    bio: "",
    phone_no: "",
    gender: "",
  });
  const uploadProfileRef = useRef(null);

  const { first_name, last_name, website, bio, phone_no, gender } = formData;

  const onUploadProfileImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setUserProfilePic(readerEvent.target.result);
      setFormData({ ...formData, profile_pic: readerEvent.target.result });
    };
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editUserProfile();
    console.log(formData);
  };

  const editUserProfile = async () => {
    // const res = await fetch(
    //   `http://localhost:8000/api/users/updateInformation/${user.id}`
    // );
    // const data = await res.json();
    // setFormData({ ...formData, ...data });
  };

  return (
    user && (
      <Container className="editprofile">
        <form onSubmit={(e) => onSubmit(e)}>
          <table>
            <tbody>
              <tr>
                <td>
                  <div
                    className="profile__img"
                    onClick={() => uploadProfileRef.current.click()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {userProfilePic === "" && <PersonIcon />}
                    {userProfilePic !== "" && (
                      <img
                        src={userProfilePic}
                        style={{
                          width: "60px",
                          height: "60px",
                        }}
                        alt="profile pic"
                      />
                    )}
                    <input
                      ref={uploadProfileRef}
                      onChange={onUploadProfileImage}
                      type="file"
                      accept="image/*"
                      hidden
                    />
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItem: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>
                      {user.first_name + " " + user.last_name}
                    </span>
                    <span
                      onClick={() => uploadProfileRef.current.click()}
                      style={{ fontSize: "1rem", color: "#0094ff", cursor: "pointer" }}
                    >
                      Change profile photo
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>First name</td>
                <td>
                  <input
                    type="text"
                    name="first_name"
                    value={first_name}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Last name</td>
                <td>
                  <input
                    type="text"
                    name="last_name"
                    value={last_name}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Website</td>
                <td>
                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => onChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>Bio</td>
                <td>
                  <input
                    type="text"
                    name="bio"
                    value={bio}
                    onChange={(e) => onChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>Phone number</td>
                <td>
                  <input
                    type="tel"
                    name="phone_no"
                    value={phone_no}
                    onChange={(e) => onChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>
                  <select
                    name="gender"
                    value={gender}
                    onChange={(e) => onChange(e)}
                  >
                    <option value="Select Gender">Select Gender:</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <Button text="Submit" submit />
        </form>
      </Container>
    )
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  userProfileImage: state.post.userProfileImage,
});

export default connect(mapStateToProps, {
  setProfileImage,
})(EditProfilePage);
