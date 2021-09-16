import { createContext } from "react";
import UserStore from "./UserStore";
import PostStore from "./PostStore";

class RootStore {
	constructor() {
		this.user = new UserStore(this);
		this.post = new PostStore(this);
	}
}
const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);

export const StoreProvider = ({ children }) => {
	return <StoreContext.Provider value={rootStore}> {children}</StoreContext.Provider>;
};
