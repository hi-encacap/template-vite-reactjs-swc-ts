import { createContext } from "react";
import { TableContextType } from "./interface";

const TableContext = createContext<TableContextType>({
  dataSource: [],
  params: {
    filters: {},
    pagination: {},
    sorter: {},
  },
  onChangeFilter: () => {},
});

export default TableContext;
