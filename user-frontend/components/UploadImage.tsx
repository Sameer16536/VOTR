"use client";

import axios from "axios";
import { BACKEND_URL } from "../utils";
import { useState, ChangeEvent } from "react";

export const UploadImage = ({
  onImageAdded,
  image,
}: {
  onImageAdded: (image: string) => void;
  image?: string;
}) => {
  const [uploading, setUploading] = useState(false);
  const onFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    if (!e.target.files) {
      setUploading(false);
      return;
    }
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const response = await axios.get(`${BACKEND_URL}/v1/user/presignedUrl`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    const preSignedUrl = response.data.preSignedUrl;
    const formData = new FormData();
    formData.set("bucket", response.data.fields["bucket"]);
    formData.set("X-Amz-Algorithm", response.data.fields["X-Amz-Algorithm"]);
    formData.set("X-Amz-Credential", response.data.fields["X-Amz-Credential"]);
    formData.set("X-Amz-Algorithm", response.data.fields["X-Amz-Algorithm"]);
    formData.set("X-Amz-Date", response.data.fields["X-Amz-Date"]);
    formData.set("key", response.data.fields["key"]);
    formData.set("Policy", response.data.fields["Policy"]);
    formData.set("X-Amz-Signature", response.data.fields["X-Amz-Signature"]);
    formData.set("X-Amz-Algorithm", response.data.fields["X-Amz-Algorithm"]);
    formData.append("file", file);
    const awsResponse = await axios.post(preSignedUrl, formData);
    console.log(awsResponse);
  };
  return (
    <div>
      <div className="w-40 h-40  rounded border text-2xl cursor-pointer">
        <div className="h-full flex justify-center  flex-col  relative bg-yellow-800 w-full">
          {image ? (
            <img className="w-full" src={image} />
          ) : (
            <>
              <input
                type="file"
                className="bg-red-400 w-40 h-40"
                style={{
                  position: "absolute",
                  opacity: 0,
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  width: "100%",
                  height: "100%",
                }}
                onChange={onFileSelect}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
