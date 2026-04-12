import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useTranslation } from "@/hooks/useTranslation";
import { useCreateDream } from "@/hooks/useCreateDream";
import notFoundImage from "@/assets/not-found.png";
import {
  DreamFormSchema,
  MAX_IMAGES,
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  type TDreamFormFields,
  PERSON_TYPES,
  FORMAT_TYPES,
} from "@/schemas/AddDreamPage.schema";
import { DreamInfoCard } from "@/components/User/AddDream/DreamInfoCard";
import { DreamFormatCard } from "@/components/User/AddDream/DreamFormatCard";
import { DreamBudgetCard } from "@/components/User/AddDream/DreamBudgetCard";
import { DreamImageCard } from "@/components/User/AddDream/DreamImageCard";
import { DreamFormActions } from "@/components/User/AddDream/DreamFormActions";
import z from "zod";
import type { CreateDream } from "@/types/dreams.type";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AddDreamPage = () => {
  const t = useTranslation();
  const { createDream } = useCreateDream();

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const localizedSchema = DreamFormSchema.extend({
    title: z.string().min(3, { message: t.validation.shortTitle }),
    description: z.string().min(10, { message: t.validation.shortDescription }),
    person_type: z.enum(PERSON_TYPES, {
      message: t.pages.addDream.categoryRequired,
    }),
    participation_format: z.enum(FORMAT_TYPES, {
      message: t.pages.addDream.formatRequired,
    }),
    target_budget: z
      .number({ message: t.validation.invalidBudget })
      .min(1, { message: t.pages.addDream.budgetRequired })
      .max(10000, { message: t.validation.maxBudget }),
    city: z.string().min(1, { message: t.validation.requiredCity }),
  });

  const form = useForm<TDreamFormFields>({
    resolver: zodResolver(localizedSchema),
    defaultValues: {
      title: "",
      description: "",
      person_type: undefined,
      participation_format: undefined,
      target_budget: undefined,
      city: "",
    },
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remaining = MAX_IMAGES - images.length;
      const validFiles = acceptedFiles
        .slice(0, remaining)
        .filter(
          (file) =>
            ACCEPTED_IMAGE_TYPES.includes(file.type) &&
            file.size <= MAX_FILE_SIZE,
        );

      setImages((prev) => [...prev, ...validFiles]);
      setPreviews((prev) => [
        ...prev,
        ...validFiles.map((f) => URL.createObjectURL(f)),
      ]);
    },
    [images],
  );

  const handleRemove = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    form.reset();
    previews.forEach((url) => URL.revokeObjectURL(url));
    setImages([]);
    setPreviews([]);
  };

  const onSubmit = async (data: TDreamFormFields) => {
    try {
      setIsSubmitting(true);
      const imageFile = images[0]
        ? (images[0] as File)
        : new File([notFoundImage], "not-found.png", { type: "image/png" });

      await createDream({
        dream: { ...(data as CreateDream) },
        image: imageFile,
      });
      Swal.fire({
        icon: "success",
        title: t.pages.addDream.successMessage,
        showConfirmButton: false,
        timer: 2000,
      });
      handleReset();

      navigate("/user/dreams");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t.feedback.errors.somethingWrong,
        text: (error as Error).message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl text-foreground font-bold text-center mb-4">
        {t.pages.addDream.pageTitle}
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        {t.pages.addDream.pageSubtitle}
      </p>

      <Form {...form}>
        <div className="w-full max-w-3xl space-y-8">
          <DreamInfoCard />
          <DreamFormatCard />
          <DreamBudgetCard />
          <DreamImageCard
            images={images}
            previews={previews}
            onDrop={handleDrop}
            onRemove={handleRemove}
          />
          <DreamFormActions
            isSubmitting={isSubmitting}
            onCancel={handleReset}
            onSubmit={form.handleSubmit(onSubmit, console.log)}
          />
        </div>
      </Form>
    </div>
  );
};
