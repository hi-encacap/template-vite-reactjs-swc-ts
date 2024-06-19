import { RefSelectProps, Select, SelectProps } from "antd";
import { debounce } from "lodash";
import { ForwardedRef, forwardRef, memo, useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import ElementError from "../ElementError";
import ElementLabel from "../ElementLabel";
import { BaseUncontrolledFormElementProps, SelectOption } from "../interface";

import NotFoundContent from "./NotFoundContent";
import SuffixIcon from "./SuffixIcon";

export interface UncontrolledDebounceSelectProps<ValueType = SelectOption>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children" | "size">,
    BaseUncontrolledFormElementProps {
  isFetching?: boolean;
  options: ValueType[];
  onFetch: (search: string) => Promise<void> | void;
}

const UncontrolledDebounceSelect = <ValueType extends SelectOption>(
  {
    className,
    error,
    id,
    isFetching,
    isRequired,
    label,
    labelClassName,
    name,
    options,
    size,
    onFetch,
    ...props
  }: UncontrolledDebounceSelectProps<ValueType>,
  ref: ForwardedRef<RefSelectProps>,
) => {
  const inputId = id ?? name;
  const sizeClassName = useMemo(() => {
    if (size === "sm") {
      return "h-9";
    }

    return "h-11";
  }, [size]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onFetchDebounce = useCallback(debounce(onFetch, 500), [onFetch]);

  return (
    <label className={labelClassName} htmlFor={inputId}>
      {label && <ElementLabel id={inputId} label={label} isRequired={isRequired} isError={!!error} />}
      <Select
        className={twMerge(sizeClassName, "block", className)}
        filterOption={false}
        id={inputId}
        notFoundContent={<NotFoundContent loading={isFetching} />}
        options={options}
        ref={ref}
        showSearch
        status={error ? "error" : undefined}
        suffixIcon={<SuffixIcon loading={isFetching} />}
        onSearch={onFetchDebounce}
        {...props}
      />
      {error && <ElementError error={error} />}
    </label>
  );
};

export default memo(forwardRef(UncontrolledDebounceSelect));
