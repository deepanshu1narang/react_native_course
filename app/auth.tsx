import useAuth from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { ExistingUserDetails, ISnackbarValues, NewUserDetails } from "./interface/interfaces";
import SignInPage from "./pages/auth/signInPage";
import SignUpPage from "./pages/auth/signUpPage";

export default function AuthScreen() {
    const [isNewUser, setIsNewUser] = useState(true);
    const [snackbarValues, setSnackbarValues] = useState<ISnackbarValues>({
        visible: false,
        message: null!
    });
    const { signIn, signUp } = useAuth();
    const router = useRouter();

    const handleSwitchMode = () => setIsNewUser(p => !p);

    function fnValidateNewUser(details: NewUserDetails): boolean {
        const { name, email, password, confirmedPassword, phone } = details;

        let visible: boolean = false;
        let isValid: boolean = true;
        let message: string = ""

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])\S.{6,}\S$/;
        const isValidPassword = passwordRegex.test(password);

        if (!name || !email || !password || !confirmedPassword) {
            visible = true;
            message = "Please fill all the mandatory values!";
            isValid = false;
        }

        else if (!isValidEmail) {
            isValid = false;
            visible = true;
            message = "Password enter a valid mail address";
        }

        else if (!isValidPassword) {
            isValid = false;
            visible = true;
            message = "Password length must be greater than 6!";
        }

        else if (password !== confirmedPassword) {
            isValid = false;
            visible = true;
            message = "Passwords do not match!";
        }

        else if (phone && phone?.length !== 10) {
            isValid = false;
            visible = true;
            message = "Please enter a valid phone number!";
        }

        if (!isValid) {
            setSnackbarValues({ visible, message });
        }

        return isValid;
    }

    function fnValidateExistingUser(details: ExistingUserDetails): boolean {
        const { email, password } = details;

        let visible: boolean = false;
        let isValid: boolean = true;
        let message: string = "";

        if (!email || !password) {
            visible = true;
            message = "Please fill all the mandatory values!";
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])\S.{6,}\S$/;
        const isValidPassword = passwordRegex.test(password);

        if (!isValidEmail) {
            isValid = false;
            visible = true;
            message = "Please enter a valid mail address";
        }
        else if (!isValidPassword) {
            isValid = false;
            visible = true;
            message = "Please enter a valid password";
        }

        if (!isValid) {
            setSnackbarValues({ visible, message });
        }

        return isValid;
    }

    const handleError = (err: string) => {
        // 
    }

    const handleSignUp = async (details: NewUserDetails): Promise<void> => {
        const isValid = fnValidateNewUser(details);
        if (isValid) {
            // handle sign Up
            // console.log("signing up", details);
            const { name, email, password, phone } = details;
            const err = await signUp(name, email, password, phone);
            if(err){
                setSnackbarValues({
                    visible: true,
                    message: err
                });
            }
            router.replace("/");
        }
    }
    
    const handleSignIn = async (details: ExistingUserDetails): Promise<void> => {
        const isValid = fnValidateExistingUser(details);
        if (isValid) {
            // handle sign Up
            const { email, password } = details;
            const err = await signIn(email, password);
            if(err){
                setSnackbarValues({
                    visible: true,
                    message: err
                });
            }
            router.replace("/");
        }
    }

    return (
        <View style={styles.container}>
            {isNewUser ? <SignUpPage onPress={handleSignUp} /> : <SignInPage onPress={handleSignIn} />}

            <Button mode="text" onPress={handleSwitchMode}>
                {isNewUser
                    ? "Already have an account? Sign In"
                    : "Wanna join? Sign up"}
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
        flex: 1
    }
});
