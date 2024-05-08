import type { AppDispatch } from "@interfaces/redux";
import { useDispatch as useDispatchOriginal } from "react-redux";

const useDispatch = useDispatchOriginal.withTypes<AppDispatch>();

export default useDispatch;
