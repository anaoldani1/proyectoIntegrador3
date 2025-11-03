import React from "react";
import { Component } from "react";
import { Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Usuario from "../screens/Usuario";
import NuevoPost from "../screens/NuevoPost";

const Tab = createBottomTabNavigator();

function HomeMenu () {
  return (
    <Tab.Navigator screenOptions={ { tabBarShowLabel: false } }>
        <Tab.Screen name="Profile" component={ Profile } options={{ tabBarIcon: () => <MaterialCommunityIcons name="face-woman-profile" size={24} color="black" />}}/>
         <Tab.Screen name="NuevoPost" component={NuevoPost} options={{ tabBarIcon: () => <MaterialCommunityIcons name="plus" size={24} color="black" />}}/>
     </Tab.Navigator>
)

}

export default HomeMenu