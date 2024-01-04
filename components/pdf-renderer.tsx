"use client";
import { ChevronDown, Loader2 } from "lucide-react";
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
interface Props {
  fileUrl: string;
}

export default function PdfRenderer({ fileUrl }: Props) {
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();
  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div
        className="h-14 w-full border-b border-zinc-200 flex items-center justify-between
      px-2"
      >
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" aria-label="previous page">
            <ChevronDown className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1.5">
            <Input className="w-12 h-8" />
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        <div ref={ref}>
          <Document
            loading={
              <div className="flex justify-center">
                <Loader2 className="my-24 w-6 h-6 animate-spin" />
              </div>
            }
            file={fileUrl}
            className="max-h-full"
            onLoadError={() => {
              toast({
                title: "Error",
                description: "Could not load file.",
                variant: "destructive",
              });
            }}
          >
            <Page width={width ? width : 1} pageNumber={1} />
          </Document>
        </div>
      </div>
    </div>
  );
}
