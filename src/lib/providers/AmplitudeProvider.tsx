"use client";

import { init, track } from "@amplitude/analytics-browser";
import { type PropsWithChildren, createContext, useEffect } from "react";

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export const AmplitudeContext = createContext({});

const AmplitudeContextProvider = ({ children }: PropsWithChildren) => {
	useEffect(() => {
		init(AMPLITUDE_API_KEY as string, undefined, {
			defaultTracking: { sessions: true },
		});
	}, []);

	const trackAmplitudeEvent = (eventName: string, eventProperties: object) => {
		track(eventName, eventProperties);
	};

	return (
		<AmplitudeContext.Provider value={{ trackAmplitudeEvent }}>
			{children}
		</AmplitudeContext.Provider>
	);
};

export default AmplitudeContextProvider;
