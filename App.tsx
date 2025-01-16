import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeIcon,
  SearchIcon,
  TicketIcon,
  UserIcon,
} from "lucide-react-native";
import AuthProvider from "./src/contexts/AuthContext";
import { Platform } from "react-native";

export type RootStackParamList = {
  Auth: undefined;
  Register: undefined;
  MainTabs: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Tickets: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

import HomeScreen from "./src/screens/main/HomeScreen";
import ExploreScreen from "./src/screens/main/ExploreScreen";
import TicketsScreen from "./src/screens/main/TicketsScreen";
import ProfileScreen from "./src/screens/main/ProfileScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#f1f1f1",
        },
        tabBarActiveTintColor: "#6366f1",
        tabBarInactiveTintColor: "#94a3b8",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color }) => <SearchIcon size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Tickets"
        component={TicketsScreen}
        options={{
          tabBarIcon: ({ color }) => <TicketIcon size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <UserIcon size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: Platform.OS === "ios" ? "default" : "slide_from_right",
            gestureEnabled: true,
            animationDuration: 300,
            contentStyle: {
              backgroundColor: "#121212",
            },
          }}
        >
          <Stack.Screen
            name="Auth"
            component={LoginScreen}
            options={{
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{
              animation: "fade",
            }}
          />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
