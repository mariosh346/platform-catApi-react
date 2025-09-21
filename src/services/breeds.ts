import { getAxios } from "../api/axiosCached";
import { Breed } from "../api/types";

export const fetchBreedById = async (id: string): Promise<Breed> => {
  const { data } = await getAxios().get<Breed>(`/breeds/${id}`);
  return data;
};
