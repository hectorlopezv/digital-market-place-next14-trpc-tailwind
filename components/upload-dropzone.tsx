import { Cloud, File } from "lucide-react";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Progress } from "./ui/progress";
import { useUploadThing } from "@/lib/upload-thing";
import { useToast } from "./ui/use-toast";
type Props = {};

export default function UploadDropZone({}: Props) {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { startUpload } = useUploadThing("pdfUploader");
  const { toast } = useToast();
  const startSimulatedProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);
    return interval;
  };
  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        console.log(acceptedFile);
        setLoading(true);
        const progressInterval = startSimulatedProgress();
        const res = await startUpload(acceptedFile);
        if (!res) {
          toast({
            title: "Something went wrong",
            description: "Please try again",
            variant: "destructive",
          });
        }
        const fileResponse = res;
        const key = fileResponse?.[0]?.key;
        if (!key) {
          return toast({
            title: "Something went wrong",
            description: "Please try again",
            variant: "destructive",
          });
        }
        clearInterval(progressInterval);
        setUploadProgress(100);
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => {
        return (
          <div
            {...getRootProps()}
            className="border h-64 m-4 border-dashed
        border-gray-300 rounded-lg"
          >
            <div className="flex items-center justify-center h-full w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center
                justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50
                hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                  <p className="mb-2 text-xm text-zinc-700">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-zinc-500">PDF (up to 4MB)</p>
                </div>
                {acceptedFiles && acceptedFiles[0] ? (
                  <div
                    className="max-w-xs bg-white flex items-center rounded-md
                overflow-hidden outline outline-[1px] outline-zinc-200
                divide-x divide-zinc-200"
                  >
                    <div className="px-3 py-2 h-full grid place-items-center">
                      <File className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="px-3 py-2 h-full text-sm truncate">
                      {acceptedFiles[0].name}
                    </div>
                  </div>
                ) : null}
                {loading ? (
                  <div className="w-full mt-4 max-w-xs mx-auto">
                    <Progress
                      value={uploadProgress}
                      className="h-1 w-full bg-zinc-200"
                    />
                  </div>
                ) : null}
              </label>
            </div>
          </div>
        );
      }}
    </Dropzone>
  );
}
