import { Stack } from 'expo-router';
import { Amplify, DataStore, Hub } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { Authenticator } from '@aws-amplify/ui-react-native';
import { useEffect } from 'react';
import { User } from '../src/models';

Amplify.configure(awsconfig);

export default function RootLayout() {
  useEffect(() => {
    const removeListener = Hub.listen('auth', async (data) => {
      if (data.payload.event === 'signIn') {
        const userInfo = data.payload.data.attributes;
        console.log(JSON.stringify(userInfo, null, 2));

        // Check if the user already exists in the database
        const existingUser = await DataStore.query(User, userInfo.sub);

        //DataStore.save(new user({ id: userInfo.sub, name}));

        if (!existingUser) {
          // If the user doesn't exist, save user to the database
          const newUser = {
            id: userInfo.sub,
            name: userInfo.name,
            email: userInfo.email,
            user_collid: userInfo.user_collid,
            user_collName: userInfo.user_collName,
            user_passYear: userInfo.user_passYear,
            user_age: userInfo.user_age,
            user_gender: userInfo.user_gender,
            user_phone: userInfo.user_phone,
            user_altPhone: userInfo.user_altPhone,
          };

          await API.graphql({
            query: Createusermutation,
            variables: { input: newUser },
          });
        }
      }
    });

    return () => {
      removeListener();
    };
  }, []);

  return (
    <Authenticator.Provider>
      <Authenticator>
        <Stack screenOptions={{ headerShown: false }} />
      </Authenticator>
    </Authenticator.Provider>
  );
}
