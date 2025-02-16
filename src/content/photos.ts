import type { Photo } from "react-photo-album";
import { fetchYamlData } from "@/utils/fetchData";

export async function getPhotos(): Promise<Photo[]> {
  return fetchYamlData("photos.yaml");
}
