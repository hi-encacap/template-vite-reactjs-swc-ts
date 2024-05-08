import type { RootState } from "@interfaces/redux";
import { useSelector as useSelectorOriginal } from "react-redux";

const useSelector = useSelectorOriginal.withTypes<RootState>();

export default useSelector;
