import { uploadImageApi, addDreamApi } from "@/api/services/dreams";
import type { CreateDream } from "@/types/dreams.type";

type CreateDreamWithImages = {
  dream: CreateDream;
  image: File;
};

export const useCreateDream = () => {
  const createDream = async ({ dream, image }: CreateDreamWithImages) => {
    console.log(image);

    const { image_url } = await uploadImageApi(image);

    const createdDream = await addDreamApi({ ...dream, image_url: image_url });

    return createdDream;
  };

  return { createDream };
};
