import React from 'react'

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Styles from "styles/user.module.scss";

function Users() {
    return (
        <div className={Styles.containerbox}>
            <div className={Styles.useraddnew}>
                <div className={Styles.user}>Users</div>
                <div className={Styles.addnew}>

                    <button>Add New</button>
                </div>
            </div>
            <div className={Styles.userfilter}>
                <div className={Styles.filter}>
                    <ul className={Styles.filterss}>
                        <li>
                            <  a href=''>
                                <span className={Styles.tab}><span className={Styles.alltab}>All</span>(7,574)</span>
                                |
                            </a>
                        </li>
                        <li>
                            < a href=''>
                                <span className={Styles.tab}><span>Adminstator</span>(7)</span>
                                |
                            </a>
                        </li>
                        <li>
                            < a href=''>
                                <span className={Styles.tab}><span>Editor</span>(1)</span>
                                |
                            </a>
                        </li>
                        <li>
                            < a href=''>
                                <span className={Styles.tab}><span>Subscriber</span>(38)</span>
                                |
                            </a>
                        </li>
                        <li>
                            < a href=''>
                                <span className={Styles.tab}><span>Custome</span>r(7523)</span>
                                |
                            </a>
                        </li>
                        <li>
                            < a href=''>
                                <span className={Styles.tab}><span>Shop Manager</span>(5)</span>

                            </a>
                        </li>
                    </ul>
                </div>
                <div className={Styles.searchorbotton}>
                    <div className={Styles.topsearch}>
                        <input type="search" className={Styles.search} placeholder="" />
                        <button>

                            search user
                        </button>
                    </div>

                </div>

            </div>
            <div className={Styles.dropdownorpagination}>
                <div className={Styles.dropdown}>
                    <div className={Styles.dropdown1}>
                        <select name="Bulkaction"  className={Styles.dropdownbox}>
                            <option value="volvo">Bulk Actions</option>
                            <option value="saab">Delete</option>
                            <option value="opel">send password reset</option>

                        </select>
                        <button>

                            Apply
                        </button>

                    </div>
                    <div className={Styles.dropdown2}>
                    <select name="Bulkaction"  className={Styles.dropdownbox}>
                            <option value="Change role to">Change role to....</option>
                            <option value="Shop manager">Shop manager</option>
                            <option value="Customer">Customer</option>
                            <option value="Subscriber">Subscriber</option>
                            <option value="Contributor">Contributor</option>
                            <option value="Author">Author</option>
                            <option value="Author">Editor</option>
                            <option value="Author">Administrator</option>

                        </select>
                        <button>

                            Changes
                        </button>

                    </div>

                </div>
                <div className={Styles.pagination}>
                    <div>7,574 items</div>
                    <div> </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    

                </div>



            </div>
            <div className={Styles.userdetail}>
            <table className={Styles.tables}>
                    <tbody>
                      <tr>
                        <th><input type="checkbox"  /></th>
                        <th>User Name</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Posts</th>
                       
                      </tr>
                     
                      <tr >
                              <td>
                              <input type="checkbox"  />
                 
                                
                              </td>
                              <td>
                                <div className={Styles.username}>
                                    <span>
                              <Image
                src="/icons/profile.png"
                alt="search"
                width={32}
                height={32}
              />
              </span>
              <span>161899</span>
              </div>
                                
                              </td>
                              <td>
                                -
                              </td>
                              <td className={Styles.email}>
                              161899@archibel.be
                              </td>
                              <td>
                              Customer
                                
                              </td>
                              <td >
                              0
                              </td>
                             
                            </tr>
                            <tr >
                              <td>
                              <input type="checkbox"  />
                 
                                
                              </td>
                              <td>
                                <div className={Styles.username}>
                                    <span>
                              <Image
                src="/icons/profile.png"
                alt="search"
                width={32}
                height={32}
              />
              </span>
              <span>161899</span>
              </div>
                                
                              </td>
                              <td>
                                -
                              </td>
                              <td className={Styles.email}>
                              161899@archibel.be
                              </td>
                              <td>
                              Customer
                                
                              </td>
                              <td >
                              0
                              </td>
                             
                            </tr>
                            <tr >
                              <td>
                              <input type="checkbox"  />
                 
                                
                              </td>
                              <td>
                                <div className={Styles.username}>
                                    <span>
                              <Image
                src="/icons/profile.png"
                alt="search"
                width={32}
                height={32}
              />
              </span>
              <span>161899</span>
              </div>
                                
                              </td>
                              <td>
                                -
                              </td>
                              <td className={Styles.email}>
                              161899@archibel.be
                              </td>
                              <td>
                              Customer
                                
                              </td>
                              <td >
                              0
                              </td>
                             
                            </tr>
                            <tr >
                              <td>
                              <input type="checkbox"  />
                 
                                
                              </td>
                              <td>
                                <div className={Styles.username}>
                                    <span>
                              <Image
                src="/icons/profile.png"
                alt="search"
                width={32}
                height={32}
              />
              </span>
              <span>161899</span>
              </div>
                                
                              </td>
                              <td>
                                -
                              </td>
                              <td className={Styles.email}>
                              161899@archibel.be
                              </td>
                              <td>
                              Customer
                                
                              </td>
                              <td >
                              0
                              </td>
                             
                            </tr>
                            <tr >
                              <td>
                              <input type="checkbox"  />
                 
                                
                              </td>
                              <td>
                                <div className={Styles.username}>
                                    <span>
                              <Image
                src="/icons/profile.png"
                alt="search"
                width={32}
                height={32}
              />
              </span>
              <span>161899</span>
              </div>
                                
                              </td>
                              <td>
                                -
                              </td>
                              <td className={Styles.email}>
                              161899@archibel.be
                              </td>
                              <td>
                              Customer
                                
                              </td>
                              <td >
                              0
                              </td>
                             
                            </tr>
                            <tr >
                              <td>
                              <input type="checkbox"  />
                 
                                
                              </td>
                              <td>
                                <div className={Styles.username}>
                                    <span>
                              <Image
                src="/icons/profile.png"
                alt="search"
                width={32}
                height={32}
              />
              </span>
              <span>161899</span>
              </div>
                                
                              </td>
                              <td>
                                -
                              </td>
                              <td className={Styles.email}>
                              161899@archibel.be
                              </td>
                              <td>
                              Customer
                                
                              </td>
                              <td >
                              0
                              </td>
                             
                            </tr>
                            <tr >
                              <td>
                              <input type="checkbox"  />
                 
                                
                              </td>
                              <td>
                                <div className={Styles.username}>
                                    <span>
                              <Image
                src="/icons/profile.png"
                alt="search"
                width={32}
                height={32}
              />
              </span>
              <span>161899</span>
              </div>
                                
                              </td>
                              <td>
                                -
                              </td>
                              <td className={Styles.email}>
                              161899@archibel.be
                              </td>
                              <td>
                              Customer
                                
                              </td>
                              <td >
                              0
                              </td>
                             
                            </tr>
                            <tr >
                              <td>
                              <input type="checkbox"  />
                 
                                
                              </td>
                              <td>
                                <div className={Styles.username}>
                                    <span>
                              <Image
                src="/icons/profile.png"
                alt="search"
                width={32}
                height={32}
              />
              </span>
              <span>161899</span>
              </div>
                                
                              </td>
                              <td>
                                -
                              </td>
                              <td className={Styles.email}>
                              161899@archibel.be
                              </td>
                              <td>
                              Customer
                                
                              </td>
                              <td >
                              0
                              </td>
                             
                            </tr>
                            <tr >
                              <td>
                              <input type="checkbox"  />
                 
                                
                              </td>
                              <td>
                                <div className={Styles.username}>
                                    <span>
                              <Image
                src="/icons/profile.png"
                alt="search"
                width={32}
                height={32}
              />
              </span>
              <span>161899</span>
              </div>
                                
                              </td>
                              <td>
                                -
                              </td>
                              <td className={Styles.email}>
                              161899@archibel.be
                              </td>
                              <td>
                              Customer
                                
                              </td>
                              <td >
                              0
                              </td>
                             
                            </tr>
                            <tr >
                              <td>
                              <input type="checkbox"  />
                 
                                
                              </td>
                              <td>
                                <div className={Styles.username}>
                                    <span>
                              <Image
                src="/icons/profile.png"
                alt="search"
                width={32}
                height={32}
              />
              </span>
              <span>161899</span>
              </div>
                                
                              </td>
                              <td>
                                -
                              </td>
                              <td className={Styles.email}>
                              161899@archibel.be
                              </td>
                              <td>
                              Customer
                                
                              </td>
                              <td >
                              0
                              </td>
                             
                            </tr>
                    </tbody>
                  </table>
            </div>

        </div>
    )
}

export default Users