import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Button, Surface, Text } from "react-native-paper";
// import { useHabits } from "./useHabits";
import { useHabits } from "@/app/pages/api/useHabits";
import useAuth from "@/lib/auth-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ActionForm = {
  habitId: string;
  action: "delete" | "complete";
};

export default function Index() {
  const { user, signOut } = useAuth();

  const { habits, completedHabits, loading } = useHabits();

  const { handleSubmit, setValue } = useForm<ActionForm>();

  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  const onAction = (data: ActionForm) => {
    const { habitId, action } = data;

    if (action === "delete") {
      // TODO: deleteHabit(habitId)
    }

    if (action === "complete") {
      // TODO: completeHabit(habitId)
    }

    swipeableRefs.current[habitId]?.close();
  };

  const triggerAction = (habitId: string, action: ActionForm["action"]) => {
    setValue("habitId", habitId);
    setValue("action", action);
    handleSubmit(onAction)();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          {`Today's Habits`}
        </Text>
        <Button onPress={signOut}>Sign Out</Button>
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : habits.length === 0 ? (
        <View style={styles.emptyState}>
          <Text>No Habits yet</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {habits.map((habit) => (
            <Surface key={habit.$id} style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{habit.title}</Text>
                <Text style={styles.cardDescription}>
                  {habit.description}
                </Text>

                <View style={styles.cardFooter}>
                  <View style={styles.cardFooter}>

                    <MaterialCommunityIcons
                      name="fire"
                      size={18}
                      color={"#ff9800"}
                    />
                    <Text style={styles.streakText}>{habit.streak_count} day streak</Text>
                  </View>
                   <View style={styles.frequencyBadge}>
                      <Text style={styles.frequencyText}>
                        {" "}
                        {habit.frequency.charAt(0).toUpperCase() +
                          habit.frequency.slice(1)}
                      </Text>
                    </View>
                </View>
              </View>
            </Surface>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontWeight: "bold",
  },

  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: "#f7f2fa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  cardCompleted: {
    opacity: 0.6,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#22223b",
  },
  cardDescription: {
    fontSize: 15,
    marginBottom: 16,
    color: "#6c6c80",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3e0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  streakText: {
    marginLeft: 6,
    color: "#ff9800",
    fontWeight: "bold",
    fontSize: 14,
  },
  frequencyBadge: {
    backgroundColor: "#ede7f6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  frequencyText: {
    color: "#7c4dff",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    color: "#666666",
  },
  swipeActionLeft: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: "#e53935",
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingLeft: 16,
  },
  swipeActionRight: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    backgroundColor: "#4caf50",
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingRight: 16,
  },
});