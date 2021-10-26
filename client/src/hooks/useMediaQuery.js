import { useState } from "react";

const useMediaQuery = () => {
	const [isMobileView, setIsMobileView] = useState(
		window.matchMedia("(max-width: 767px)").matches
	);

	return [isMobileView, setIsMobileView];
};

export default useMediaQuery;
