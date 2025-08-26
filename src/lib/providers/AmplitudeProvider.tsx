"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";
import { type PropsWithChildren, createContext, useEffect } from "react";

const AMPLITUDE_API_KEY =
	process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY ||
	"fce0354d33d49be0f72471eb7b4dd1b4";

export const AmplitudeContext = createContext({});

const AmplitudeContextProvider = ({ children }: PropsWithChildren) => {
	useEffect(() => {
		// Add Session Replay to the Amplitude instance
		amplitude.add(sessionReplayPlugin({ sampleRate: 1 }));

		// Initialize amplitude with autocapture enabled
		amplitude.init(AMPLITUDE_API_KEY, { autocapture: true });
	}, []);

	const trackAmplitudeEvent = (eventName: string, eventProperties: object) => {
		amplitude.track(eventName, eventProperties);
	};

	return (
		<AmplitudeContext.Provider value={{ trackAmplitudeEvent }}>
			{children}
		</AmplitudeContext.Provider>
	);
};

export default AmplitudeContextProvider;
