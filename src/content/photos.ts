import type { Photo } from "react-photo-album";
import { loadYaml } from "@/utils/loadData";

export async function getPhotos(): Promise<Photo[]> {
  return loadYaml<Photo[]>("photos.yaml");
}
