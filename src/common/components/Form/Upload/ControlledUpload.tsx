import { UploadProps as AntdUploadProps } from "antd";
import { omit } from "lodash";
import { memo, useCallback } from "react";
import { useController } from "react-hook-form";

import { BaseFormElementProps } from "../interface";

import UncontrolledUpload, { UncontrolledUploadProps } from "./UncontrolledUpload";

const ControlledUpload = ({ control, name, ...props }: BaseFormElementProps & UncontrolledUploadProps) => {
  const {
    field: { onChange, value, ref },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback<Required<AntdUploadProps>["onChange"]>(
    ({ fileList }) => onChange(fileList),
    [onChange],
  );

  return (
    <UncontrolledUpload
      name={name}
      ref={ref}
      error={(errors[name]?.message as string) ?? ""}
      value={value}
      onChange={handleChange}
      {...omit(props, ["value", "onChange", "onBlur"])}
    />
  );
};

export default memo(ControlledUpload);
