import { NzSafeAny } from "ng-zorro-antd/core/types";

export interface RemoteResult {
  code: number;
  data: NzSafeAny;
  message: string;
}