import { Plus } from "lucide-react";
import { memo } from "react";
import { useIntl } from "react-intl";

const UploadButton = () => {
  const { formatMessage } = useIntl();

  return (
    <button className="flex flex-col items-center justify-center space-y-2" type="button">
      <Plus size={20} />
      <div>{formatMessage({ id: "upload" })}</div>
    </button>
  );
};

export default memo(UploadButton);
