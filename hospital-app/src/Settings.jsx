import { useState, useEffect } from "react";
import "./Settings.css";

function Settings() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );
  const [fontSize, setFontSize] = useState(
    () => localStorage.getItem("fontSize") || "medium",
  );
  const [notificationStatus, setNotificationStatus] = useState(
    () => localStorage.getItem("notificationStatus") || "off",
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);
  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);
  useEffect(() => {
    localStorage.setItem("notificationStatus", notificationStatus);
  }, [notificationStatus]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleChangePassword = () => {
    setPasswordMessage("");

    if (!newPassword || !confirmPassword || !currentPassword) {
      setPasswordMessage("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("New password and confirmation don't match.");
      return;
    }

    fetch(`https://localhost:7172/api/user/${currentUser.id}/password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        CurrentPassword: currentPassword,
        NewPassword: newPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Current password is incorrect.");
        }
        return response.json();
      })
      .then(() => {
        setPasswordMessage("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        setPasswordMessage(error.message);
      });
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      {currentUser && (
        <p className="settings-user-info">
          Logged in as <strong>{currentUser.username}</strong> (
          {currentUser.role})
        </p>
      )}

      <div className="settings-row">
        <div className="settings-section">
          <label>Theme</label>
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>

        <div className="settings-section">
          <label>Notifications</label>
          <select
            value={notificationStatus}
            onChange={(e) => setNotificationStatus(e.target.value)}
          >
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>
        </div>

        <div className="settings-section">
          <label>Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="settings-section">
          <label>Font Size</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      <div className="settings-divider"></div>

      <h2>Change Password</h2>
      <div className="settings-row">
        <div className="settings-section">
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="settings-section">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="settings-section">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="settings-section">
          <label>&nbsp;</label>
          <button className="save-password-btn" onClick={handleChangePassword}>
            Update Password
          </button>
        </div>
      </div>
      {passwordMessage && <p className="settings-message">{passwordMessage}</p>}
    </div>
  );
}

export default Settings;
