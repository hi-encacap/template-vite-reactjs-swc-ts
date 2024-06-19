import { Input, InputProps, InputRef } from "antd";
import { set } from "lodash";
import {
  ChangeEventHandler,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  memo,
  useCallback,
  useMemo,
} from "react";

import { beautyPrice, normalizePrice } from "@utils/helpers";

import { BaseUncontrolledFormElementProps } from "../interface";

type PriceInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "name"> &
  Omit<BaseUncontrolledFormElementProps, "size"> &
  InputProps;

const PriceInput = ({ value, onChange, ...props }: PriceInputProps, ref: ForwardedRef<InputRef>) => {
  const beautifulValue = useMemo(() => {
    if (!value) {
      return value;
    }

    const trimedCharValue = value.toString().replace(/[^0-9]/g, "");

    return beautyPrice(Number(trimedCharValue));
  }, [value]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { value } = e.target;

      if (!value) {
        onChange?.(e);
        return;
      }

      set(e, "target.value", normalizePrice(e.target.value));
      onChange?.(e);
    },
    [onChange],
  );

  return <Input value={beautifulValue} maxLength={19} ref={ref} onChange={handleChange} {...props} />;
};

export default memo(forwardRef(PriceInput));
