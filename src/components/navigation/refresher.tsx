"use client";

import React from "react";
import { startRefresh } from "./utils";

const Refresher = ({ children }: { children: React.ReactNode }) => {
	const timeoutId = React.useRef<number | null>(null);

	React.useEffect(() => {
		startRefresh(timeoutId);
		return () => {
			if (timeoutId.current) {
				clearTimeout(timeoutId.current);
			}
		};
	}, []);

	return <>{children}</>;
};

export default Refresher;
