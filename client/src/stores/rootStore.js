import { createContext } from "react";
import UserStore from "./User";

export const StoreContext = createContext(UserStore);

export const StoreProvider = ({ children }) => {
	const store = {
		user: new UserStore()
	};
	return <StoreContext.Provider value={store}> {children}</StoreContext.Provider>;
};
