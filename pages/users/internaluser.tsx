import React from "react";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Styles from "styles/internaluser.module.scss";
import Textarea from "components/element/textarea";

function InternalUser() {
  return (
    <div className={Styles.containerbox}>
      <div className={Styles.useraddnew}>
        <div className={Styles.user}>Edit User 161899</div>
        <div className={Styles.addnew}>
          <button>Add New</button>
        </div>
      </div>
      <h1>Personal Options</h1>
      <div className={Styles.data}>
        <table className={Styles.tables}>
          <tbody>
            <tr>
              <th>Visual Editor </th>
              <td>
                <span>
                  <input type="checkbox" className={Styles.checkboxstyle} />
                </span>{" "}
                Disable the visual editor when writing
              </td>
            </tr>
            <tr>
              <th> Keyboard Shortcuts </th>
              <td>
                <span>
                  <input type="checkbox" className={Styles.checkboxstyle} />
                </span>{" "}
                Enable keyboard shortcuts for comment moderation.
                <a href="">More information</a>
              </td>
            </tr>
            <tr>
              <th> Toolbar </th>
              <td>
                <span>
                  <input type="checkbox" className={Styles.checkboxstyle} />
                </span>{" "}
                Show toolbar when viewing site
              </td>
            </tr>
            <tr>
              <th> Language </th>
              <td>
                <div className={Styles.dropdown1}>
                  <select name="language" className={Styles.dropdownbox}>
                    <option value="Site Default">Site Defaults</option>
                    <option value="English (United States)">
                      English (United States)
                    </option>
                    <option value="English (UK)">English (UK)</option>
                  </select>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h1>Name</h1>
      <div className={Styles.data}>
        <table className={Styles.tables}>
          <tbody>
            <tr>
              <th>Username </th>
              <td>
                <span>
                  <input
                    className={Styles.textbox}
                    type="text"
                    placeholder="161899"
                    disabled
                  />
                </span>{" "}
                Disable the visual editor when writing
              </td>
            </tr>

            <tr>
              <th> Role </th>
              <td>
                <div className={Styles.dropdown1}>
                  <select name="Role" className={Styles.dropdownbox}>
                    <option value="Shop manager">Shop manager</option>
                    <option value="Customer">Customer</option>
                    <option value="Subscriber">Subscriber</option>
                    <option value="contributor">contributor</option>
                    <option value="Author">Author</option>
                    <option value="Editor">Editor</option>
                    <option value="Administrator">Administrator</option>
                    <option value="No role for this site">
                      — No role for this site —
                    </option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <th>First Name</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th>Last Name </th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th>Nickname (required)</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th> Display name publicly as </th>
              <td>
                <div className={Styles.dropdown1}>
                  <select name="Role" className={Styles.dropdownbox}>
                    <option value="161899">161899</option>
                  </select>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1>Contact Info</h1>
      <div className={Styles.data}>
        <table className={Styles.tables}>
          <tbody>
            <tr>
              <th>Email (required)</th>
              <td>
                <span>
                  <input
                    className={Styles.textbox}
                    type="email"
                    placeholder="161899@archibel.be"
                    required
                  />
                </span>
              </td>
            </tr>
            <tr>
              <th>Website </th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th>Phone Number</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th>Facebook Link</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th>Twitter Link</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th>Instagram</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th>Twitter username (without @)</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th>Facebook profile URL</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1>About the user</h1>
      <div className={Styles.data}>
        <table className={Styles.tables}>
          <tbody>
            <tr>
              <th>Biographical Info</th>
              <td>
                <span>
                  <textarea className={Styles.textareabox} />
                  {/* <input className={Styles.textareabox} type="textarea" /> */}
                </span>
                <div className={Styles.instruction}>
                  Share a little biographical information to fill out your
                  profile. This may be shown publicly.
                </div>
              </td>
            </tr>
            <tr>
              <th>Profile Picture</th>
              <td>
                <span>
                  <Image
                    src="/icons/profile.png"
                    alt="search"
                    width={96}
                    height={96}
                  />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1>Account Management</h1>
      <div className={Styles.data}>
        <table className={Styles.tables}>
          <tbody>
            <tr>
              <th>New Password</th>
              <td>
                {" "}
                <button>Set New Password</button>
              </td>
            </tr>
            <tr>
              <th>Password Reset</th>
              <td>
                {" "}
                <button>Send Reset Link</button>
                <div className={Styles.description}>
                  Share a little biographical information to fill out your
                  profile. This may be shown publicly.
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={Styles.applicationpassword}>
        <h1>Application Passwords</h1>
        <p>
          Application passwords allow authentication via non-interactive
          systems, such as XML-RPC or the REST API, without providing your
          actual password. Application passwords can be easily revoked. They
          cannot be used for traditional logins to your website
        </p>
      </div>

      <h1 className={Styles.signupheading}>Login/Signup Pop up fields</h1>
      <h1>Elementor Notes</h1>
      <div className={Styles.data}>
        <table className={Styles.tables}>
          <tbody>
            <tr>
              <th>Visual Editor </th>
              <td>
                <span>
                  <input type="checkbox" className={Styles.checkboxstyle} />
                </span>{" "}
                Allow user to access the Notes feature.
                <div className={Styles.description}>
                  Share a little biographical information to fill out your
                  profile. This may be shown publicly.
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={Styles.customerdetail}>
          <h1>Stripe Customer ID's</h1>
          <p>
            If you change a customer ID, the customer's payment methods will be
            imported from your Stripe account.
          </p>
          <p>
            If you change a customer ID, the customer's payment methods will be
            imported from your Stripe account.
          </p>
        </div>
        <table className={Styles.tables}>
          <tbody>
            <tr>
              <th>Live ID</th>
              <td>
                <span>
                  <input className={Styles.textbox2} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th>Test ID</th>
              <td>
                <span>
                  <input className={Styles.textbox2} type="text" />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={Styles.customerdetail}>
          <h1>Stripe Live Payment Methods</h1>
          <p>No live payment methods saved.</p>
        </div>
        <div className={Styles.customerdetail}>
          <h1>Stripe Test Payment Methods</h1>
          <p>
            No test payment methods saved Note: Payment methods will be deleted
            from your WordPress site and within Stripe.
          </p>
        </div>
      </div>
      <h1>Customer billing address</h1>
      <div className={Styles.data}>
        <table className={Styles.tables}>
          <tbody>
            <tr>
              <th>First name </th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th>Last name</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th>Company</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th>Address line 1</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th>Address line 2</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th>City</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th>Postcode / ZIP</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
            <tr>
              <th> Country/Region </th>
              <td>
                <div className={Styles.dropdown1}>
                  <select name="Country/Region" className={Styles.dropdownbox}>
                    <option value="Select a country">
                      Select a country / region…
                    </option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <th>State / County</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
                <div className={Styles.description}>
                  Share a little biographical information to fill out your
                  profile. This may be shown publicly.
                </div>
              </td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>
                <span>
                  <input className={Styles.textbox} type="text" />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={Styles.submitdetail}>
        <button> Update User</button>
      </div>
    </div>
  );
}

export default InternalUser;
