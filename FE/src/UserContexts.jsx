
import React, { useState, useEffect } from 'react';

// Create the context
const UserContext = React.createContext();

// Create a provider component
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Effect to load the user from localStorage when the component mounts
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // Effect to save the user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
