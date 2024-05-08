import type { RootState } from "@interfaces/redux";
import { useDispatch as useDispatchOriginal } from "react-redux";

const useDispatch = useDispatchOriginal.withTypes<RootState>();

export default useDispatch;
