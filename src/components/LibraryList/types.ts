import { ILibrary } from "@/types";

export interface ILibraryListProps {
  libraries: ILibrary[];
  loading: boolean;
  error?: string;
}