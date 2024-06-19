import { UploadProps } from "antd/es/upload";

import { UPLOAD } from "@constants/apiPath";
import { IUploadResponse } from "@interfaces/common";
import { axios } from "@utils/index";

const uploadFile: UploadProps["customRequest"] = async ({ file, onSuccess }) => {
  const data = new FormData();

  data.append("file", file);

  const response = await axios.post<IUploadResponse>(UPLOAD.SINGLE, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  onSuccess?.(response.data.url);
};

export { uploadFile };
