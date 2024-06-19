import { debounce } from "lodash";
import { Search } from "lucide-react";
import { ChangeEventHandler, memo, useCallback, useState } from "react";
import { useIntl } from "react-intl";

import { Input, InputProps } from "@components/Form";
import { DEFAULT_DEBOUNCE_TIME } from "@constants/common";

interface TableHeaderSearchProps extends Required<Pick<InputProps, "value">> {
  onChange: (value: string) => void;
}

const TableHeaderSearch = ({ value, onChange }: TableHeaderSearchProps) => {
  const { formatMessage } = useIntl();

  const [search, setSearch] = useState(value);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeDebounce = useCallback(debounce(onChange, DEFAULT_DEBOUNCE_TIME), [onChange]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { value } = e.target;
      setSearch(value);
      onChangeDebounce(value);
    },
    [onChangeDebounce],
  );

  return (
    <Input
      className="mb-6 mr-6 w-56 space-x-2.5 px-3.5"
      name="search"
      value={search}
      placeholder={formatMessage({ id: "search" })}
      prefix={<Search size={18} className="text-gray-300" />}
      onChange={handleChange}
    />
  );
};

export default memo(TableHeaderSearch);
