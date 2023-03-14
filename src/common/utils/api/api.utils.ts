import { NextApiRequest, NextApiResponse } from "next";

import { RemoveNeverProperties } from "../typescript";

export interface APIResponseSuccess<T> {
  status: "Success";
  data?: T;
  size?: T extends any[] ? number : never;
}

export interface APIResponseFailure {
  status: "Failure";
  message: string;
}

export type APIResponse<T> =
  | RemoveNeverProperties<APIResponseSuccess<T>>
  | APIResponseFailure;

export type TServerlessFunction<T = void> = (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<T>>
) => Promise<void>;
