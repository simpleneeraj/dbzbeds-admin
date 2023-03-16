import React from "react";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Styles from "styles/user.module.scss";
import { useFetchOrderById, useGetAllUsers } from "network-requests/queries";
import { useRouter } from "next/router";
import { useSocket } from "hooks/useSocket";
import DashboardHeader from "layout/header";
import MobileSidebar from "layout/mobilesidebar";

function Users() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const { data, isLoading } = useGetAllUsers({ page, limit });

  console.log(data, "key");

  const handleNextPage = () => {
    if (page < (data?.totalPages || 0)) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const addUser = () => {
    router.push("./newproduct/create/");
  };
  return (
    <>
      <div className={Styles.rightsidebar}>
        <DashboardHeader />

        <div className={Styles.containerbox}>
          <div className={Styles.useraddnew}>
            <div className={Styles.user}>Users</div>
            <div className={Styles.addnew}>
              <button onClick={addUser}>Add New</button>
            </div>
          </div>
          <div className={Styles.userfilter}>
            <div className={Styles.filter}>
              <ul className={Styles.filterss}>
                <li>
                  <a href="">
                    <span className={Styles.tab}>
                      <span className={Styles.alltab}>All</span>(7,574)
                    </span>
                    |
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className={Styles.tab}>
                      <span>Adminstator</span>(7)
                    </span>
                    |
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className={Styles.tab}>
                      <span>Editor</span>(1)
                    </span>
                    |
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className={Styles.tab}>
                      <span>Subscriber</span>(38)
                    </span>
                    |
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className={Styles.tab}>
                      <span>Custome</span>r(7523)
                    </span>
                    |
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className={Styles.tab}>
                      <span>Shop Manager</span>(5)
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className={Styles.searchorbotton}>
              <div className={Styles.topsearch}>
                <input type="search" className={Styles.search} placeholder="" />
                <button>search user</button>
              </div>
            </div>
          </div>
          <div className={Styles.dropdownorpagination}>
            <div className={Styles.dropdown}>
              <div className={Styles.dropdown1}>
                <select name="Bulkaction" className={Styles.dropdownbox}>
                  <option value="volvo">Bulk Actions</option>
                  <option value="saab">Delete</option>
                  <option value="opel">send password reset</option>
                </select>
                <button>Apply</button>
              </div>
              <div className={Styles.dropdown2}>
                <select name="Bulkaction" className={Styles.dropdownbox}>
                  <option value="Change role to">Change role to....</option>
                  <option value="Shop manager">Shop manager</option>
                  <option value="Customer">Customer</option>
                  <option value="Subscriber">Subscriber</option>
                  <option value="Contributor">Contributor</option>
                  <option value="Author">Author</option>
                  <option value="Author">Editor</option>
                  <option value="Author">Administrator</option>
                </select>
                <button>Changes</button>
              </div>
            </div>
            <div className={Styles.pagination}>
              <div> {data?.totalUsers} Users</div>
              <div className={Styles.arrow}>
                <span className={Styles.imgstyle} onClick={() => setPage(1)}>
                  <Image
                    src="/icons/leftdouble.svg"
                    alt="search"
                    width={10}
                    height={10}
                  />
                </span>
              </div>
              <div className={Styles.arrow} onClick={handlePrevPage}>
                <span className={Styles.imgstyle}>
                  <Image
                    src="/icons/leftsingle.svg"
                    alt="search"
                    width={10}
                    height={10}
                  />
                </span>
              </div>
              <div>
                <input
                  type="text"
                  className={Styles.count}
                  // onChange={(e) => {

                  //   if (Number(e.target.value) < (data?.totalPages || 0)) {
                  //     setPage(Number(e.target.value));
                  //   }
                  // }}
                  value={page}
                  placeholder={String(page)}
                />
              </div>
              <div> of {data?.totalPages}</div>
              <div className={Styles.arrow} onClick={handleNextPage}>
                <span className={Styles.imgstyle}>
                  <Image
                    src="/icons/rightarrow-single.svg"
                    alt="search"
                    width={10}
                    height={10}
                  />
                </span>
              </div>
              <div
                className={Styles.arrow}
                onClick={() => setPage(data?.totalPages || 1)}
              >
                <span className={Styles.imgstyle}>
                  <Image
                    src="/icons/rightarrow-double.svg"
                    alt="search"
                    width={10}
                    height={10}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className={Styles.userdetail}>
            <table className={Styles.tables}>
              <tbody>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>User Name</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Phone Number</th>
                </tr>
                {data?.users?.map((user) => (
                  <tr key={user?._id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div className={Styles.username}>
                        <span className={Styles.imgstyle}>
                          <Image
                            src={`https://avatars.dicebear.com/api/male/${user?.name}.png`}
                            alt="search"
                            width={32}
                            height={32}
                          />
                        </span>
                      </div>
                    </td>
                    <td>{user?.name}</td>
                    <td className={Styles.email}>{user?.email}</td>
                    <td>{user?.role}</td>
                    <td>{user?.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
