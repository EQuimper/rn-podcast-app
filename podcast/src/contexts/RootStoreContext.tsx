import React from 'react';

import RootStore from '../stores/RootStore';

const RootStoreContext = React.createContext<RootStore | null>(null);

const RootStoreProvider: React.FC<{ rootStore: RootStore }> = props => (
  <RootStoreContext.Provider value={props.rootStore}>
    {props.children}
  </RootStoreContext.Provider>
);

const useRootStore = () => {
  const store = React.useContext(RootStoreContext);

  if (!store) {
    throw new Error('Forget to use the RootStoreProvider');
  }

  return store;
};

export { RootStoreContext, RootStoreProvider, useRootStore };
