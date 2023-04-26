import { LogEx, Paging } from "@/common/types";

export interface UserListReq extends Paging, LogEx {
    srch_project_no?: string;
}
export interface UserListResList {
    list: UserList[];
    recordsTotal: number;
}

export interface UserList {
    active_status_name?: string;
}
