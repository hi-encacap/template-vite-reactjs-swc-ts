import { memo } from "react";

import LoadingSpinner from "./Spinner";

const UMLoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <LoadingSpinner className="h-12 w-12" />
    </div>
  );
};

const LoadingOverlay = memo(UMLoadingOverlay);

export default LoadingOverlay;
