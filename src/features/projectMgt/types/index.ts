import { LogEx, Paging } from "@/common/types";

export interface ProjectListReq extends Paging, LogEx {
    srch_project_no?: string;
}
export interface ProjectListResList {
    list: ProjectList[];
    recordsTotal: number;
}

export interface ProjectList {
    all_cnt?: string;
    business_price?: string;
}
