import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name = 'Validacion'
                    component = { Validacion }
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack
