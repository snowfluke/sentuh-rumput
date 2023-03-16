// Modules
import React, {useState, useEffect} from 'react';
import {GlobalContext, useGlobalContext} from './src/context/global-context';
import RNBootSplash from 'react-native-bootsplash';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {SentuhRumput} from './src/screens';
import {Onboard} from './src/screens/menu';

import {Loading, MyModal} from './src/components';
import {retrieveLocal} from './src/helpers';
import {WEB_CLIENT_ID} from './src/config';

export default App = () => {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const GlobalData = useGlobalContext();

  const checkOnboarding = async () => {
    try {
      const isOnboard = await retrieveLocal('onboard');
      if (isOnboard !== null) {
        setViewedOnboarding(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
    RNBootSplash.hide();
  }, []);

  return (
    <GlobalContext.Provider value={GlobalData}>
      <>
        {loading ? (
          <Loading />
        ) : viewedOnboarding ? (
          <SentuhRumput />
        ) : (
          <Onboard />
        )}
        <MyModal />
      </>
    </GlobalContext.Provider>
  );
};
