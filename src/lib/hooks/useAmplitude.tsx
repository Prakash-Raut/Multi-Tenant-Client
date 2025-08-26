import { AmplitudeContext } from "@/lib/providers/AmplitudeProvider";
import { useContext } from "react";

const useAmplitude = () => {
	const context = useContext(AmplitudeContext);
	if (!context)
		throw new Error(
			"useAmplitude must be used inside AmplitudeContextProvider",
		);
	return context;
};

export default useAmplitude;
