import * as React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from '../views/login/login';


const Stack = createNativeStackNavigator();
const StackNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LogIn} />
    </Stack.Navigator>
  )


}

export default StackNavigator