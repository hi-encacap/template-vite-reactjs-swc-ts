import { HttpStatusCode, isAxiosError } from "axios";
import { get, keys, snakeCase } from "lodash";
import { FieldPath, FieldValues, UseFormSetError, UseFormSetFocus } from "react-hook-form";

import { FormatMessage } from "@interfaces/common";

type FormatMessageKeyMapping = Record<string, string>;

interface SetFormErrorParam<T extends FieldValues> {
  keyMapping?: FormatMessageKeyMapping;
  setError: UseFormSetError<T>;
  formatMessage?: FormatMessage;
  otherwise?: (message?: string) => void;
  setFocus?: UseFormSetFocus<T>;
  getField?: (field: string) => string;
}

const formatErrorMessage = (t: FormatMessage, prefix?: string) => {
  const prefixMessage = prefix ? `${prefix}.` : "";
  return (key: string, message: string) => t({ id: `${prefixMessage}${key}.${message}` });
};

const setFormError = <T extends FieldValues>(
  error: unknown,
  { keyMapping = {}, setError, formatMessage, setFocus, otherwise, getField }: SetFormErrorParam<T>,
) => {
  if (!isAxiosError(error)) {
    const message = get(error, "message");

    otherwise?.(message);
    return;
  }

  const { response, message: responseMessage } = error;

  if (!response) {
    otherwise?.(responseMessage);
    return;
  }

  const { status, data } = response;

  if (status !== HttpStatusCode.BadRequest) {
    otherwise?.(data?.message);
    return;
  }

  const {
    data: { message },
  } = response;

  if (!message.includes('"')) {
    otherwise?.(message);
    return;
  }

  let firstKey = "";
  // Transform from `"status" is required, "floor" must be a string, "code" is not allowed".
  // to { status: ["status is required"], floor: ["floor must be a string"], code: ["code is not allowed"] }
  const field = message.split(", ").reduce((acc: Record<string, string[]>, item: string) => {
    const [key, ...value] = item.split(" ");
    const formattedKey = key.replace(/"/g, "");

    if (!acc[formattedKey]) {
      acc[formattedKey] = [];
    }

    if (formatMessage) {
      const snakeCaseKey = snakeCase(formattedKey);
      const mappedKey = keyMapping[snakeCaseKey] ?? snakeCaseKey;
      acc[formattedKey].push([formatMessage({ id: mappedKey }), ...value].join(" "));
    } else {
      acc[formattedKey].push([formattedKey, ...value].join(" "));
    }

    return acc;
  }, {});

  keys(field).forEach((key) => {
    const value = field[key][0];
    const formattedKey = getField?.(key) ?? key;

    if (!firstKey) {
      firstKey = key;
    }

    setError(formattedKey as FieldPath<T>, {
      message: value,
    });
  });

  setFocus?.(firstKey as FieldPath<T>);
};

const commonFormErrorFactory = (t: FormatMessage, prefix?: string) => {
  return (error?: string) => {
    if (!error) {
      return error;
    }

    const errorKey = error.split(".").at(-1);

    return t({ id: (prefix ? prefix + "." : "") + (errorKey ?? error) });
  };
};

export { commonFormErrorFactory, formatErrorMessage, setFormError };
