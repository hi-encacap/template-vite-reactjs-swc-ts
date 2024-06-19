import { Empty } from "antd";

interface TableEmptyProps {
  loading: boolean;
}

const TableEmpty = ({ loading }: TableEmptyProps) => {
  if (loading) return <div className="h-64" />;

  return <Empty className="py-24" />;
};

export default TableEmpty;
