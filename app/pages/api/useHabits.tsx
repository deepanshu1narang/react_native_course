// useHabits.ts
import { Habit } from "@/types/database.type";
import { useEffect, useState } from "react";
import useAuth from "../../../lib/auth-context";
import { getHabits } from "./habits";

export const useHabits = () => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [completedHabits, setCompletedHabits] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchHabits = async () => {
            setLoading(true);
            try{
                console.log(user?.$id, "<<<<<<<<userId");

                const { data, status_code } = await getHabits(user?.$id!);
                if(status_code === 200)
                    setHabits(data ?? []);
                
                // TODO: subscribe habits
                // TODO: subscribe completions
                
                // TODO: fetchHabits()
                // TODO: fetchTodayCompletions()
            }
            catch(err){
                console.log(err);
            }
            finally{
                setLoading(false);
            }
        };
        
        console.log(user, "<<<<<<<<userId22");
        if (user?.$id) {
            fetchHabits();
        }

        return () => {
            // TODO: unsubscribe
        };
    }, [user]);

    return {
        habits,
        completedHabits,
        setHabits,
        setCompletedHabits,
        loading
    };
};