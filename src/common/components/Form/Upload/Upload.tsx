import { memo } from "react";

import { BaseFormElementProps } from "../interface";

import ControlledUpload from "./ControlledUpload";
import UncontrolledUpload, { UncontrolledUploadProps } from "./UncontrolledUpload";

export type UploadProps = BaseFormElementProps & UncontrolledUploadProps;

const Upload = ({ control, name, ...props }: UploadProps) => {
  if (!control) {
    return <UncontrolledUpload name={name} {...props} />;
  }

  return <ControlledUpload control={control} name={name} {...props} />;
};

export default memo(Upload);
