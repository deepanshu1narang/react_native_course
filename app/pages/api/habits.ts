// import { databases } from "@/lib/appwrite";
import { ID, Query } from "react-native-appwrite";
import { DATABASE_ID, HABITS_TABLE_ID, tablesDB } from "../../../lib/appwrite";

// const DATABASE_ID = "YOUR_DB_ID";
// const HABITS_TABLE_ID = "YOUR_TABLE_ID";

type AddHabitPayload = {
    user_id: string;
    title: string;
    description?: string;
    frequency: "daily" | "weekly" | "monthly";
};

export const addHabit = async (payload: AddHabitPayload) => {
    try {
        const cleanedData = {
            title: payload.title.trim(),
            description: payload.description?.trim() || null,
            frequency: payload.frequency,
            streak_count: 0,
            last_completed: new Date().toISOString(),
            user_id: payload.user_id
        };

        // basic validation
        if (!cleanedData.title) {
            throw new Error("Title is required");
        }
        const rowId = ID.unique();

        const response = await tablesDB.createRow({
            databaseId: DATABASE_ID,
            tableId: HABITS_TABLE_ID,
            rowId: rowId,
            data: cleanedData
        });

        return {
            success: true,
            data: response,
        };
    } catch (error) {
        console.error("Add Habit Error:", error);

        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to create habit",
        };
    }
};

export const getHabits = async (userId: string) => {
    if (!userId) {
        throw new Error("userId is required aaaaaag");
    }
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: HABITS_TABLE_ID,
            queries: [
                Query.equal("user_id", userId),
            ],
        });
        return {
            success: true,
            status_code: 200,
            data: response.rows,
            count: response.total
        };
    }
    catch (error) {
        console.error("Add Habit Error:", error);

        return {
            success: false,
            status_code: 404,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to create habit",
        };
    }
}

export const deleteHabit = async (habitId: string) => {
    try {
        await tablesDB.deleteRow({
            databaseId: DATABASE_ID,
            tableId: HABITS_TABLE_ID,
            rowId: habitId,
        });

        return {
            success: true,
            status_code: 200,
            data: habitId,
        };
    } catch (error) {
        console.error("Delete Habit Error:", error);

        return {
            success: false,
            status_code: 404,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to delete habit",
        };
    }
};

type EditHabitPayload = {
    title?: string;
    description?: string;
    frequency?: "daily" | "weekly" | "monthly";
};

export const editHabit = async (
    habitId: string,
    updates: EditHabitPayload
) => {
    try {
        const cleanedData = {
            ...(updates.title && { title: updates.title.trim() }),
            ...(updates.description && {
                description: updates.description.trim(),
            }),
            ...(updates.frequency && { frequency: updates.frequency }),
        };

        const response = await tablesDB.updateRow({
            databaseId: DATABASE_ID,
            tableId: HABITS_TABLE_ID,
            rowId: habitId,
            data: cleanedData,
        });

        return {
            success: true,
            status_code: 200,
            data: response,
        };
    } catch (error) {
        console.error("Edit Habit Error:", error);

        return {
            success: false,
            status_code: 400,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to update habit",
        };
    }
};

export const completeHabit = async (
    habitId: string,
    currentStreak: number
) => {
    try {
        const currentDate = new Date().toISOString();

        const response = await tablesDB.updateRow({
            databaseId: DATABASE_ID,
            tableId: HABITS_TABLE_ID,
            rowId: habitId,
            data: {
                streak_count: currentStreak + 1,
                last_completed: currentDate,
            },
        });

        return {
            success: true,
            status_code: 200,
            data: response,
        };
    } catch (error) {
        console.error("Complete Habit Error:", error);

        return {
            success: false,
            status_code: 400,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to complete habit",
        };
    }
};

export const getHabitById = async (habitId: string) => {
    try {
        const response = await tablesDB.getRow({
            databaseId: DATABASE_ID,
            tableId: HABITS_TABLE_ID,
            rowId: habitId,
        });

        return {
            success: true,
            status_code: 200,
            data: response,
        };
    } catch (error) {
        console.error("Get Habit Error:", error);

        return {
            success: false,
            status_code: 404,
            error:
                error instanceof Error
                    ? error.message
                    : "Habit not found",
        };
    }
};

export const resetHabitStreak = async (habitId: string) => {
    try {
        const response = await tablesDB.updateRow({
            databaseId: DATABASE_ID,
            tableId: HABITS_TABLE_ID,
            rowId: habitId,
            data: {
                streak_count: 0,
            },
        });

        return {
            success: true,
            status_code: 200,
            data: response,
        };
    } catch (error) {
        console.error("Reset Habit Error:", error);

        return {
            success: false,
            status_code: 400,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to reset streak",
        };
    }
};
