import { Search } from "lucide-react";
import { useIntl } from "react-intl";

const ContainerHeaderSearch = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="flex w-64 items-center space-x-4 rounded-lg bg-white px-5 py-3">
      <Search className="text-primary" strokeWidth={2.25} size={22} />
      <div>{formatMessage({ id: "search_here_td" })}</div>
    </div>
  );
};

export default ContainerHeaderSearch;
