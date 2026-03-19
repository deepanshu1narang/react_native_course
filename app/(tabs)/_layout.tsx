
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
        headerStyle: {
          backgroundColor: "#f5f5f5",  
        },
        headerShadowVisible: true,
       tabBarActiveTintColor: "#6200ee", tabBarActiveBackgroundColor: "#66666678" 
      }} >
      <Tabs.Screen name="index" options={{
        title: "Today's Habits",
        tabBarIcon: ({ color, size }) => {
          return <MaterialCommunityIcons size={size} color={color} name="calendar-today" />
        }
      }} />
      {/* <Tabs.Screen name="streaks" options={{
        title: "Streaks",
        tabBarIcon: ({color, size}) => {
          return <MaterialCommunityIcons size={size} color={color} name="chart-line" />
        }
      }} /> */}
      <Tabs.Screen name="addHabit" options={{
        title: "Add Habit",
        tabBarIcon: ({color, size}) => {
          return <MaterialCommunityIcons size={size} color={color} name="plus-circle" />
        }
      }} />
    </Tabs>
  );
}
