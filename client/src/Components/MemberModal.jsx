import React from "react";
import { FiX } from "react-icons/fi";

function MemberModal({ setShowModal, roomMembers }) {
  function handleHideModal() {
    setShowModal(false);
  }

  const memberList = roomMembers.map((member) =>
    member.is_admin ? (
      <div>Admin: {member?.user?.username}</div>
    ) : (
      <div> {member?.user?.username}</div>
    )
  );

  function handleInvite(e) {
    e.preventDefault();
    console.log("this should send an email");
  }

  return (
    <div>
      <div className=" fixed right-44 top-0  flex  z-50 outline-none focus:outline-none">
        <div className=" w-auto my-6 mx-auto max-w-3xl  rounded-lg">
          {/* content */}
          <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 border-2 border-b-green-1050 bg-green-950 rounded-t">
              <h2 className="text-black float-left text-3xl font-bold">
                Members
              </h2>
              <button
                onClick={handleHideModal}
                className="className='p-1 ml-auto bg-transparent border-0 text-black opacity-40 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'"
              >
                <FiX />
              </button>
            </div>
            {/* content */}
            <div className="p-5">{memberList}</div>
            <div className="p-3">
              <h3 className="text-xl">Invite a new member</h3>
              <form onSubmit={handleInvite}>
                <label htmlFor="email" className="">
                  {" "}
                  Email:{" "}
                </label>
                <input
                  autoComplete="never"
                  type="text"
                  name="email"
                  className="border rounded-lg"
                ></input>
                <button
                  className="bg-green-1050 p-2 m-2 rounded-full"
                  type="submit"
                >
                  Invite
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberModal;
