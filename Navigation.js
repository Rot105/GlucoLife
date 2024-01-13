import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//Screens
import HomeScreen from "./screens/HomeScreen";
import RegistroComponents from "./Components/Registro"
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import InformationScreen from "./screens/InformationScreen";

const Tab = createBottomTabNavigator();

const CustomBarTabButton = ({children, onPress, setModalVisible}) => (
    <TouchableOpacity
    style={{
        top:-30,
        justifyContent:'center',
        alignItems:'center',
        ...style.shadow
    }}
        onPress={() => {
            setModalVisible(true);
            onPress();
          }}
    >
        <View style={{
            width:70,
            height:70,
            borderRadius:35,
            backgroundColor:"#e32f45"
        }}>
            {children}
        </View>
    </TouchableOpacity>
)  

function MyTabs(){
    const RegistroCom = () => <RegistroComponents modalVisible={modalVisible} setModalVisible={setModalVisible} />;
    const [modalVisible,setModalVisible] = useState(false)

    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle:{
                    position:"absolute",
                    left:10,
                    right:10,
                    elevation:0,
                    backgroundColor:"#ffffff",
                    borderRadius:15,
                    height:80,
                    ...style.shadow
                }
            }}
        >
            <Tab.Screen name="Inicio" component={HomeScreen} options={{
                tabBarLabel:"Inicio",
                tabBarIcon:({ focused}) => (
                    <View style={{alignItems:'center',justifyContent:'center',top:2}}>
                        <Image
                            source={require('./assets/icons/home.png')}
                            resizeMode='contain'
                            style={{
                                width:25,
                                height:25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text style={{color: focused ? '#e32f45' : '#748c94',fontSize:12}}>Inicio</Text>
                    </View>
                ),
                
            }}/>
            
            <Tab.Screen name="Registro" 
            component={RegistroCom}
            options={{
                tabBarIcon:({}) =>(
                    <View>
                        <Image
                        source={require('./assets/icons/plus.png')}
                        resizeMode="contain"
                        style={{
                            width:30,
                            height:30,
                            tintColor:'#fff'
                        }}
                        />
                    </View>
                ),
                    tabBarButton:(props) => (
                        <CustomBarTabButton {...props} setModalVisible={setModalVisible}/>
                    )
                }}
            />

            <Tab.Screen name="Información" component={InformationScreen} options={{
                tabBarLabel:"Información",
                tabBarIcon:({ focused}) => (
                    <View style={{alignItems:'center',justifyContent:'center',top:2}}>
                        <Image
                            source={require('./assets/icons/information.png')}
                            resizeMode='contain'
                            style={{
                                width:25,
                                height:25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text style={{color: focused ? '#e32f45' : '#748c94',fontSize:12}}>Información</Text>
                    </View>
                ),
            }}/>
        </Tab.Navigator>
    );
}

const style = StyleSheet.create({
    shadow:{
        shadowColor:"#7F5DF0",
        shadowOffset:{
            width:0,
            height:0,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5,
    }
})

export default function Navigation(){
    return(
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    );
}