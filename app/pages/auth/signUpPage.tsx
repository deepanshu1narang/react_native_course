import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { NewUserDetails } from '../../interface/interfaces';
import { stylesAuthPages as styles } from './authPageStyles';

interface SignUpPageProps {
    onPress: (details: NewUserDetails) => void;
}

export default function SignUpPage({ onPress }: SignUpPageProps) {

    const newUser = {
        name: "",
        email: "",
        password: "",
        confirmedPassword: "",
        phone: ""
    };

    const [details, setDetails] = useState<NewUserDetails>(newUser);
    const [hidePassword, setHidePassword] = useState<{ password: boolean, confirmedPassword: boolean }>({ password: true, confirmedPassword: true });

    const theme = useTheme();

    const fnFillDetails = (property: string, value: string) => {
        setDetails({
            ...details,
            [property]: value
        });
    }

    const handleButtonPress = () => {
        onPress(details);
        setDetails(newUser);
    }

    const handleShowPassword = (property: "password" | "confirmedPassword") => {
        setHidePassword({
            ...hidePassword,
            [property]: !hidePassword[property]
        });
    }

    const handleHidePassword = (property: "password" | "confirmedPassword") => {
        setHidePassword({
            ...hidePassword,
            [property]: true
        });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.loginScreenView}>
                <Text variant="headlineSmall">Create Account</Text>

                <TextInput
                    mode="outlined"
                    autoCapitalize="words"
                    placeholder="Full Name"
                    label="Name"
                    style={styles.input}
                    value={details.name}
                    onChangeText={text => {
                        fnFillDetails("name", text);
                    }}
                />

                <TextInput
                    mode="outlined"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="account@example.com"
                    label="Email"
                    value={details.email}
                    style={styles.input}
                    onChangeText={text => {
                        fnFillDetails("email", text);
                    }}
                    />

                <TextInput
                    mode="outlined"
                    autoCapitalize="none"
                    label="Password"
                    value={details.password}
                    secureTextEntry={hidePassword.password}
                    right={<TextInput.Icon icon="eye" onPress={() => handleShowPassword("password")} />}
                    style={styles.input}
                    onBlur={() => handleHidePassword("password")}
                    onChangeText={text => {
                        fnFillDetails("password", text);
                    }}
                    />

                <TextInput
                    mode="outlined"
                    autoCapitalize="none"
                    value={details.confirmedPassword}
                    label="Confirm Password"
                    secureTextEntry={hidePassword.confirmedPassword}
                    onBlur={() => handleHidePassword("confirmedPassword")}
                    style={styles.input}
                    error={details?.confirmedPassword?.length > 0 && details.confirmedPassword !== details.password}
                    right={<TextInput.Icon icon="eye" onPress={() => handleShowPassword("confirmedPassword")} />}
                    onChangeText={text => {
                        fnFillDetails("confirmedPassword", text);
                    }}
                />
                {details?.confirmedPassword?.length > 0 && details.confirmedPassword !== details.password && <Text
                    variant="bodySmall"
                    style={{
                        color: theme.colors.error
                    }}
                >
                    Passwords do not match
                </Text>}

                <TextInput
                    mode="outlined"
                    keyboardType="phone-pad"
                    value={details.phone}
                    placeholder="999999999"
                    label="Phone no."
                    style={styles.input}
                    onChangeText={text => {
                        fnFillDetails("phone", text);
                    }}
                />

                <Button mode="contained" onPress={handleButtonPress} style={styles.button}>Sign Up</Button>
            </View>
        </KeyboardAvoidingView>
    )
}
