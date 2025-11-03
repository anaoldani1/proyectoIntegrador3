// navigation/HomeMenu.js
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Profile from "../screens/Profile";
import NewPost from "../screens/NewPost"; // <- coincide con el export del archivo

const Tab = createBottomTabNavigator();

function HomeMenu () {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
      <Tab.Screen  name="Profile" component={Profile} options={{tabBarIcon: () => <MaterialCommunityIcons name="face-woman-profile" size={24} color="black" /> }}/>
      <Tab.Screen name="NewPost" component={NewPost}  options={{tabBarIcon: () => <MaterialCommunityIcons name="plus" size={24} color="black" />}}/>
    </Tab.Navigator>
  );
}

export default HomeMenu;
