import { useCreateUser } from "network-requests/mutations";
import React from "react";

// import Link from "next/link";
// import { useState } from "react";
// import Image from "next/image";
import Styles from "styles/Addnew.module.scss";

function AddNew() {
  const { mutate } = useCreateUser();

  return (
    <div className={Styles.containerbox}>
      <div className={Styles.AddNewUser}>
        <h1>Add New User</h1>
      </div>
      <div className={Styles.NewUserLine}>
        <p>Create a brand new user and add them to this site.</p>
      </div>
      <table className={Styles.tableForm}>
        <tr className={Styles.userName}>
          <th>
            <span className={Styles.a}>Username</span>
            <span className={Styles.b}>(required)</span>
          </th>
          <td>
            <input type="text" name="user-name-input" required></input>
          </td>
        </tr>

        <tr className={Styles.userName}>
          <th>
            <span className="a">Email</span>
            <span className={Styles.b}>(required)</span>
          </th>
          <td>
            <input type="text" name="user-name-input" required></input>
          </td>
        </tr>
        <tr className={Styles.userName}>
          <th>
            <span>First Name</span>
            {/* <span className={Styles.b}>(required)</span> */}
          </th>
          <td>
            <input type="text" name="user-name-input" required></input>
          </td>
        </tr>
        <tr className={Styles.userName}>
          <th>
            <span>Last Name</span>
            {/* <span className={Styles.b}>(required)</span> */}
          </th>
          <td>
            <input type="text" name="user-name-input" required></input>
          </td>
        </tr>
        <tr className={Styles.userName}>
          <th>
            <span>Website</span>
            {/* <span className={Styles.b}>(required)</span> */}
          </th>
          <td>
            <input type="text" name="user-name-input" required></input>
          </td>
        </tr>

        <tr className={Styles.userName}>
          <th>
            <span>Language</span>
            <span className={Styles.dashicons_translation}></span>
          </th>
          <td>
            <select name="drop" className={Styles.dropDown}>
              <option>Site Default</option>
              <option>English (United State)</option>
              <option>English (UK)</option>
            </select>
          </td>
        </tr>
        <tr className={Styles.userName}>
          <th>
            <span>Password</span>
            {/* <span className={Styles.b}>(required)</span> */}
          </th>
          <td>
            <button type="button" className={Styles.buttonPassword}>
              Generate Password
            </button>
            <div className={Styles.passwordCombination}>
              <span>
                <input
                  type="password"
                  name="pas1"
                  className={Styles.Pass_input_field}
                  aria-describedby="pass-strength-result"
                ></input>
              </span>
              <button
                type="button"
                className={Styles.Hide_Show}
                area-label="show password"
              >
                <span
                  className={Styles.dashicons_visibility}
                  aria-hidden="true"
                ></span>
                <span className={Styles.showText}>Show</span>
              </button>
            </div>
          </td>
        </tr>
        <tr className={Styles.userName}>
          <th>
            <span className={Styles.a}>Send User Notification</span>
            {/* <span className={Styles.b}>(required)</span> */}
          </th>
          <td>
            <span className={Styles.checkbox}>
              <input type="checkbox" />
            </span>
            <span className={Styles.send}>
              Send the new user an email about their account.
            </span>
          </td>
        </tr>
        <tr className={Styles.userName}>
          <th>
            <span>Role</span>
          </th>
          <td>
            <select name="drop" className={Styles.dropDown}>
              <option>Shop manager</option>
              <option>Customer</option>
              <option>Subscriber</option>
              <option>Contributor</option>
              <option>Author</option>
              <option>Editor</option>
              <option>Administrator</option>
            </select>
          </td>
        </tr>
      </table>
      <div className={Styles.add_new_button}>
        <button type="submit">Add New User</button>
      </div>
    </div>
  );
}

export default AddNew;
