import React, { useContext, useState } from "react";

export const MemberContext = React.createContext();
export const MemberUpdateContext = React.createContext();

export function useMember() {
  return useContext(MemberContext);
}

export function useMemberUpdate() {
  return useContext(MemberUpdateContext);
}

export function MemberProvider({ children }) {
  const [currentMember, setCurrentMember] = useState({});

  function handleSetMember(member) {
    setCurrentMember(member);
  }

  return (
    <MemberContext.Provider value={currentMember}>
      <MemberUpdateContext.Provider value={handleSetMember}>
        {children}
      </MemberUpdateContext.Provider>
    </MemberContext.Provider>
  );
}
