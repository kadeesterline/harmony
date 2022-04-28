import React, { useContext, useState, useEffect } from "react";

export const ChannelContext = React.createContext();
export const ChannelUpdateContext = React.createContext();

export function useChannel() {
  return useContext(ChannelContext);
}

export function useChannelUpdate() {
  return useContext(ChannelUpdateContext);
}

export function ChannelProvider({ children }) {
  const [currentChannel, setCurrentChannel] = useState({});

  function handleSetChannel(channel) {
    setCurrentChannel(channel);
  }

  return (
    <ChannelContext.Provider value={currentChannel}>
      <ChannelUpdateContext.Provider value={handleSetChannel}>
        {children}
      </ChannelUpdateContext.Provider>
    </ChannelContext.Provider>
  );
}
