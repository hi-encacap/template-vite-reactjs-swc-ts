import { TableContextType } from "@components/Table";
import TableContext from "@components/Table/context";
import { AnyObject } from "antd/es/_util/type";
import { useContext } from "react";

const useTable = <T extends AnyObject>() => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("useTable must be used within a TableProvider");
  }

  return context as TableContextType<T>;
};

export default useTable;
