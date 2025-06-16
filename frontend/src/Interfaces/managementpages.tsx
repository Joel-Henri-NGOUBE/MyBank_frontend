import type { Dispatch, SetStateAction } from "react";

export interface ManagementPages{
    pages: boolean[];
    setPages: Dispatch<SetStateAction<boolean[]>>
}