import { createContext, useState} from 'react';

export const userDetailsContext = createContext();

const UserDetailsProvider = (props) => {
    const [user, setUser] = useState();

    return (
        <userDetailsContext.Provider value={[user, setUser]}>
            {props.children}
        </userDetailsContext.Provider>
    );
};

export default UserDetailsProvider;