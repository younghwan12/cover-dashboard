import { LogEx, Paging } from "@/common/types";

export interface UserListReq extends Paging, LogEx {
  srch_project_no?: string;
}
export interface UserListResList {
  list: UserList[];
  recordsTotal: number;
}

export interface UserDetailResList {
  prjAuth: prjList[];
  userInfo: UserInfo[];
}
export interface UserDetailReqList extends LogEx {
  user_id: string;
}

export interface prjList {
  auth?: string;
  auth_name?: string;
  nexcore_solution_name?: string;
  project_name?: string;
  project_no?: string;
  user_id?: string;
}

export interface UserInfo {
  active_status: string;
  auth: string;
  company: string;
  create_route: string;
  email: string;
  last_project_no: string;
  mail_active_status: string;
  nexcore_solution: string;
  phone_number: string;
  project_name: string;
  remarks: string;
  user_id: string;
  user_name: string;
}

export interface UserList {
  active_status_name?: string;
  user_id?: string;
}

export interface DelUser extends LogEx {
  user_id: string;
}

export interface UserDelReq extends LogEx {
  delData:
    | [
        {
          user_id?: string;
        }
      ]
    | string;
}
