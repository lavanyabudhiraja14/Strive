import { useEffect, useState } from "react";
import API from "../api/axios";
import "./settings.css";

function Settings() {
const [user, setUser] = useState({
name: "",
email: "",
profilePicture: "",
bio: "",


githubUsername: "",
leetcodeHandle: "",
codeforcesHandle: "",

codechefHandle: "",
atcoderHandle: "",
gfgUsername: "",


});

const [passwordData, setPasswordData] =
useState({
currentPassword: "",
newPassword: "",
confirmPassword: "",
});

useEffect(() => {
fetchProfile();
}, []);

const fetchProfile = async () => {
try {
const res =
await API.get("/users/me");


  setUser(res.data);
} catch (error) {
  console.log(error);
}


};

const saveProfile = async () => {
try {
await API.put(
"/users/profile",
{
bio: user.bio,


      profilePicture:
        user.profilePicture,

      githubUsername:
        user.githubUsername,

      leetcodeHandle:
        user.leetcodeHandle,

      codeforcesHandle:
        user.codeforcesHandle,

      codechefHandle:
        user.codechefHandle,

      atcoderHandle:
        user.atcoderHandle,

      gfgUsername:
        user.gfgUsername,
    }
  );

  alert(
    "Profile Updated Successfully!"
  );
} catch (error) {
  console.log(error);
}


};

const updatePassword =
async () => {
if (
passwordData.newPassword !==
passwordData.confirmPassword
) {
alert(
"Passwords do not match"
);
return;
}


  try {
    await API.put(
      "/users/password",
      passwordData
    );

    alert(
      "Password Updated Successfully!"
    );

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  } catch (error) {
    console.log(error);

    alert(
      "Failed to update password"
    );
  }
};


return ( <div className="settings-page">


  <div className="settings-header">
    <h1>Settings</h1>

    <p>
      Manage your developer
      profiles and account.
    </p>
  </div>

  <div className="settings-card profile-card">

    <div className="profile-left">

      <img
        src={
          user.profilePicture ||
          "/default-avatar.png"
        }
        alt="profile"
      />

      <div>
        <h2>{user.name}</h2>

        <p>{user.email}</p>
      </div>

    </div>

  </div>

  <div className="settings-card">

    <h2>
      Developer Profiles
    </h2>

    <div className="setting-row">
      <input
        type="text"
        placeholder="Profile Picture URL"
        value={
          user.profilePicture
        }
        onChange={(e) =>
          setUser({
            ...user,
            profilePicture:
              e.target.value,
          })
        }
      />
    </div>

    

    <div className="setting-row">
      <input
        type="text"
        placeholder="LeetCode Username"
        value={
          user.leetcodeHandle
        }
        onChange={(e) =>
          setUser({
            ...user,
            leetcodeHandle:
              e.target.value,
          })
        }
      />
    </div>

    <div className="setting-row">
      <input
        type="text"
        placeholder="Codeforces Handle"
        value={
          user.codeforcesHandle
        }
        onChange={(e) =>
          setUser({
            ...user,
            codeforcesHandle:
              e.target.value,
          })
        }
      />
    </div>

    <div className="setting-row">
      <input
        type="text"
        placeholder="CodeChef Handle"
        value={
          user.codechefHandle
        }
        onChange={(e) =>
          setUser({
            ...user,
            codechefHandle:
              e.target.value,
          })
        }
      />
    </div>

    <div className="setting-row">
      <input
        type="text"
        placeholder="AtCoder Handle"
        value={
          user.atcoderHandle
        }
        onChange={(e) =>
          setUser({
            ...user,
            atcoderHandle:
              e.target.value,
          })
        }
      />
    </div>

    <div className="setting-row">
      <input
        type="text"
        placeholder="GeeksForGeeks Username"
        value={
          user.gfgUsername
        }
        onChange={(e) =>
          setUser({
            ...user,
            gfgUsername:
              e.target.value,
          })
        }
      />
    </div>

    <div className="setting-row">
      <textarea
        placeholder="Bio"
        value={user.bio}
        onChange={(e) =>
          setUser({
            ...user,
            bio:
              e.target.value,
          })
        }
      />
    </div>

    <button
      className="save-btn"
      onClick={saveProfile}
    >
      Save Changes
    </button>

  </div>

  <div className="settings-card">

    <h2>
      Change Password
    </h2>

    <div className="setting-row">
      <input
        type="password"
        placeholder="Current Password"
        value={
          passwordData.currentPassword
        }
        onChange={(e) =>
          setPasswordData({
            ...passwordData,
            currentPassword:
              e.target.value,
          })
        }
      />
    </div>

    <div className="setting-row">
      <input
        type="password"
        placeholder="New Password"
        value={
          passwordData.newPassword
        }
        onChange={(e) =>
          setPasswordData({
            ...passwordData,
            newPassword:
              e.target.value,
          })
        }
      />
    </div>

    <div className="setting-row">
      <input
        type="password"
        placeholder="Confirm New Password"
        value={
          passwordData.confirmPassword
        }
        onChange={(e) =>
          setPasswordData({
            ...passwordData,
            confirmPassword:
              e.target.value,
          })
        }
      />
    </div>

    <button
      className="save-btn"
      onClick={updatePassword}
    >
      Update Password
    </button>

  </div>

</div>


);
}

export default Settings;
