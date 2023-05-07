import { useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { UserContext } from '../AppContext';

const auth = getAuth();

// https://blog.logrocket.com/integrating-firebase-authentication-expo-mobile-app/
export function useAuthentication() {
    const userContext = useContext(UserContext);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                userContext.userUid = user.uid;
            } else {
                setUser(undefined);
            }
        });

        return unsubscribeFromAuthStatusChanged;

    }, []);

    return {
        user
    };

}