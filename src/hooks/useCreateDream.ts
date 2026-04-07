import { uploadImageApi, addDreamApi } from "@/api/services/dreams";
import type { CreateDream } from "@/types/dreams.type";

type CreateDreamWithImages = {
  dream: CreateDream;
  image: File;
};

export const useCreateDream = () => {
  const createDream = async ({ dream, image }: CreateDreamWithImages) => {
    const { image_url } = await uploadImageApi(image);

    const createdDream = await addDreamApi({ ...dream, image: image_url });

    return createdDream;
  };

  return { createDream };
};
