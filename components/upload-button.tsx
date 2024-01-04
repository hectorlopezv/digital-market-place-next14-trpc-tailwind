"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import UploadDropZone from "./upload-dropzone";

type Props = {};

export default function UploadButton({}: Props) {
  const [isOpen, setisOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setisOpen(v);
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setisOpen(true)}>
        <Button>Upload Pdf</Button>
      </DialogTrigger>
      <DialogContent>
        <UploadDropZone />
      </DialogContent>
    </Dialog>
  );
}
