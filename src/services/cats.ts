import { getAxios } from "../api/axiosCached";
import { CatImage } from "../api/types"; // Assuming Cat is CatImage

export const fetchCatById = async (id: string): Promise<CatImage> => {
  const { data } = await getAxios().get<CatImage>(`/images/${id}`);
  return data;
};
