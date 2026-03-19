// useHabits.ts
import { Habit } from "@/types/database.type";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import useAuth from "../../../lib/auth-context";
import { completeHabit, deleteHabit, getHabits } from "./habits";

export const useHabits = () => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [completedHabits, setCompletedHabits] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();

    useFocusEffect(
        useCallback(() => {
            if (user?.$id) {
                fetchHabits();
            }
            // Optionally, return a cleanup function here
        }, [user])
    );

    const fetchHabits = async () => {
        setLoading(true);
        try {
            const { data, status_code } = await getHabits(user?.$id!);
            if (status_code === 200) setHabits(data ?? []);
            // TODO: subscribe habits
            // TODO: subscribe completions
            // TODO: fetchHabits()
            // TODO: fetchTodayCompletions()
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };


    const handleDeleteHabit = async (habit: Habit) => {
        await deleteHabit(habit.$id);
        await fetchHabits();
    }

    const handleCompleteHabit = async (habit: Habit) => {
        await completeHabit(habit.$id, habit.streak_count);
        await fetchHabits();
    }

    return {
        habits,
        completedHabits,
        setHabits,
        setCompletedHabits,
        loading, handleDeleteHabit, handleCompleteHabit
    };
};