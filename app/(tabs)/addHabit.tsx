import { addHabit } from "@/app/pages/api/habits";
import useAuth from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import {
    Button,
    SegmentedButtons,
    Snackbar,
    Text,
    TextInput,
} from "react-native-paper";
import { ISnackbarValues } from "../interface/interfaces";

const FREQUENCIES = ["daily", "weekly", "monthly"] as const;

type FormData = {
    title: string;
    description?: string;
    frequency: (typeof FREQUENCIES)[number];
};

export default function AddHabit() {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            title: "",
            description: "",
            frequency: "daily",
        },
    });
    const { user } = useAuth();
    const router = useRouter();
    const [snackbarValues, setSnackbarValues] = useState<ISnackbarValues>({
        visible: false,
        message: null!
    });
    const [loading, setLoading] = useState(false);

    //   console.log("user>>>>", user);

    const onSubmit = async (data: FormData) => {
        if (!user) return;

        setLoading(true);
        if (!data.description)
            data.description = data.title;

        const result = await addHabit({
            user_id: user.$id,
            ...data,
        });

        setLoading(false);

        if (!result.success) {
            console.log(result.error);
            setSnackbarValues({
                visible: true,
                message: result.error!
            });
            return;
        }

        setSnackbarValues({
            visible: true,
            message: `Habit added`
        });

        // router.back();
        reset();
    };


    return (
        <View style={styles.container}>

            <Controller
                control={control}
                name="title"
                rules={{ required: "Title is required" }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        label="Title"
                        mode="outlined"
                        value={value}
                        onChangeText={onChange}
                        style={styles.input}
                    />
                )}
            />
            {errors.title && <Text>{errors.title.message}</Text>}

            <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        label="Description"
                        mode="outlined"
                        value={value}
                        onChangeText={onChange}
                        style={styles.input}
                    />
                )}
            />
            {errors.description && <Text>{errors.description.message}</Text>}

            <Controller
                control={control}
                name="frequency"
                render={({ field: { onChange, value } }) => (
                    <SegmentedButtons
                        value={value}
                        onValueChange={onChange}
                        buttons={FREQUENCIES.map((freq) => ({
                            value: freq,
                            label: freq.charAt(0).toUpperCase() + freq.slice(1),
                        }))}
                    />
                )}
            />

            <Button mode="contained" style={styles.addHabitButton}  loading={loading}
  disabled={loading} onPress={handleSubmit(onSubmit)}>
                Add Habit
            </Button>

            <Snackbar visible={snackbarValues.visible} duration={2000} onDismiss={() => setSnackbarValues({
                visible: false,
                message: null!
            })}>
                {snackbarValues.message}
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
    },
    input: {
        marginBottom: 16,
    },
    addHabitButton: {
        marginTop: 16
    }
});
