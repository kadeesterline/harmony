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

  return (
    <div>
      <div className=" fixed right-44 top-0  flex  z-50 outline-none focus:outline-none">
        <div className=" w-auto my-6 mx-auto max-w-3xl border-2 border-green-1050 rounded-lg">
          {/* content */}
          <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 border border-solid bg-slate-200 rounded-t">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberModal;
