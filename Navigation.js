import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/MaterialCommunityIcons';

//Screens
import HomeScreen from "./screens/HomeScreen";
import InformationScreen from "./screens/InformationScreen";
import RegistroComponents from "./Components/Registro"
const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="GlucoLife" component={HomeScreen} options={{
                tabBarLabel:"Inicio",
                tabBarIcon:({ color, size}) => (
                    <Feather name="home" color={color} size={size}/>
                )
            }}/>
            <Tab.Screen name="Registro" component={RegistroComponents} options={{
                tabBarLabel:"Información",
            }}/>
        </Tab.Navigator>
    );
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    );
}