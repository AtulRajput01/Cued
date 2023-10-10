import { Stack } from 'expo-router';
import { Amplify, DataStore, Hub } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { Authenticator } from '@aws-amplify/ui-react-native';
import { useEffect } from 'react';
import { User } from '../src/models';

Amplify.configure(awsconfig);

export default function RootLayout() {
  useEffect(() => {
    if (data.payload.event =='signin') {
      const userInfo = data.payload.data.attributes;
      console.log(JSON.stringify(userInfo, null, 2));

      DataStore.save(new user({ id: userInfo.sub, name}));
      
    }
  });

  return () => {
    removeListner();
   };
  }, []);

 return (
   <Authenticator.Provider>
     <Authenticator>
       <Stack screenOptions={{ headerShown: false }) />
     </Authenticator>
   </Authenticator.Provider>
 );
}

