import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { AllPlaces } from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import { init } from "./utils/database";
import * as SplashScreen from 'expo-splash-screen';
import { Text, View } from "react-native";
import FallbackText from "./UI/FallbackText";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [isDbLoaded, setDbLoaded] = useState(false)
  useEffect(()=>{
    init().then(()=>{
      setDbLoaded(true)
      SplashScreen.hideAsync()
    })

  },[])
  if(!isDbLoaded){
    return <FallbackText>Loading...Please wait.</FallbackText>
  }
  
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500},
          headerTintColor: Colors.gray700,
          contentStyle:{backgroundColor: Colors.gray700}
        }} >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={() => ({
              title: "Add a new Place",
            })}
          />
          <Stack.Screen
          name="Map"
            component={Map}
            
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
