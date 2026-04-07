import { useDropzone } from "react-dropzone";
import { ImagePlus, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MAX_FILE_SIZE, MAX_IMAGES } from "@/schemas/AddDreamPage.schema";
import { useTranslation } from "@/hooks/useTranslation";

type Props = {
  images: File[];
  previews: string[];
  onDrop: (files: File[]) => void;
  onRemove: (index: number) => void;
};

export const DreamImageCard = ({
  images,
  previews,
  onDrop,
  onRemove,
}: Props) => {
  const t = useTranslation();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxSize: MAX_FILE_SIZE,
    disabled: images.length >= MAX_IMAGES,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <ImagePlus className="w-5 h-5" />
          {t.forms.labels.image.title}
          <span className="text-sm font-normal text-muted-foreground ml-1">
            (optional)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer",
            "hover:border-primary hover:bg-primary/5",
            isDragActive
              ? "border-primary bg-primary/10 scale-[1.01]"
              : "border-border bg-muted/40",
            images.length >= MAX_IMAGES
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : "",
          )}
        >
          <Input className="text-foreground" {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <div
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-200",
                isDragActive ? "bg-primary/20" : "bg-muted",
              )}
            >
              <Upload
                className={cn(
                  "w-6 h-6 transition-colors duration-200",
                  isDragActive ? "text-primary" : "text-muted-foreground",
                )}
              />
            </div>
            {isDragActive ? (
              <p className="text-primary font-medium">
                {t.forms.labels.image.instruction}
              </p>
            ) : (
              <div>
                <p className="text-foreground font-medium">
                  {t.forms.labels.image.instruction}
                  <span className="text-primary underline underline-offset-2">
                    {t.forms.labels.image.formats}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t.forms.labels.image.formats}
                </p>
              </div>
            )}
          </div>
        </div>

        {previews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {previews.map((src, index) => (
              <div
                key={src}
                className="group relative aspect-square rounded-lg overflow-hidden border border-border shadow-sm"
              >
                <img
                  src={src}
                  alt={`Превʼю ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className={cn(
                    "absolute top-1.5 right-1.5 w-6 h-6 rounded-full",
                    "bg-black/60 text-white flex items-center justify-center",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                    "hover:bg-red-500 cursor-pointer",
                  )}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {images.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {t.forms.labels.image.added}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
