import { Upload, UploadFile, UploadProps } from "antd";
import { UploadRef } from "antd/es/upload/Upload";
import { ForwardedRef, forwardRef, memo } from "react";

import { fileService } from "@services/index";

import { BaseUncontrolledFormElementProps } from "../interface";

import UploadButton from "./UploadButton";

export interface UncontrolledUploadProps
  extends BaseUncontrolledFormElementProps,
    Omit<UploadProps, "name" | "size"> {
  value?: UploadFile[];
}

const UncontrolledUpload = (
  { listType = "picture-card", value, onChange, ...props }: UncontrolledUploadProps,
  ref: ForwardedRef<UploadRef>,
) => {
  return (
    <>
      <Upload
        customRequest={fileService.uploadFile}
        className="flex space-x-6"
        listType={listType}
        fileList={value}
        ref={ref}
        onChange={onChange}
        {...props}
      >
        <UploadButton />
      </Upload>
      {/* {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )} */}
    </>
  );
};

export default memo(forwardRef(UncontrolledUpload));
