import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { ExistingUserDetails } from '../../interface/interfaces';
import { stylesAuthPages as styles } from './authPageStyles';

interface SignUpPageProps {
    onPress: (details: ExistingUserDetails) => void;
    // onPress?: any;
}

export default function SignInPage({ onPress }: SignUpPageProps) {
    const newUser = {
        email: "",
        password: ""
    };

    const [details, setDetails] = useState<ExistingUserDetails>(newUser);

    const [hidePassword, setHidePassword] = useState<boolean>(true);

    const fnFillDetails = (property: string, value: string) => {
        setDetails({
            ...details,
            [property]: value
        });
    }

    const handleShowPassword = () => {
        setHidePassword(h => !h);
    }

    const handleHidePassword = () => {
        setHidePassword(true);
    }

    const handleButtonPress = () => {
        onPress(details);
        setDetails(newUser);
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.loginScreenView}>
                <Text variant="headlineSmall">Welcome Back</Text>

                <TextInput
                    mode="outlined"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="account@example.com"
                    label="Email"
                    value={details.email}
                    style={styles.input}
                    onChangeText={text => fnFillDetails("email", text)}
                    />

                <TextInput
                    mode="outlined"
                    autoCapitalize="none"
                    value={details.password}
                    label="Password"
                    style={styles.input}
                    secureTextEntry={hidePassword}
                    onChangeText={text => fnFillDetails("password", text)}
                    right={<TextInput.Icon icon="eye" onPress={handleShowPassword} />}
                    onBlur={handleHidePassword}
                />

                <Button mode="contained" onPress={handleButtonPress} style={styles.button}>Sign In</Button>
            </View>
        </KeyboardAvoidingView>
    )
}