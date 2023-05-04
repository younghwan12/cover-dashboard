import { LogEx, Paging } from "@/common/types";

export interface CodeMgtReq extends Paging, LogEx {
    code_group_id?: string;
    code_group_name?: string;
    code_id?: string;
    code_name?: string;
    parent_code_group_id?: string;
    mapping_code?: string;
    code_order?: string;
    use_yn?: string;
}

export interface AddCodeMgtReq extends LogEx {
    code_group_id: string;
    code_group_name: string;
    code_id: string;
    code_name: string;
    parent_code_group_id: string;
    mapping_code: string;
    code_order: string;
    use_yn: string;
}
export interface DelCodeMgtReq extends LogEx {
    delData: DelList[] | string;
}
interface DelList {
    code_group_id: string;
    code_id: string;
}

export interface DelCode extends LogEx {
    code_group_id: string;
    code_id: string;
}

export interface CodeMgtResList {
    list: List[];
    recordsTotal: number;
}

export interface List {
    all_cnt: number;
    chk: string;
    code_group_id: string;
    code_group_name: string;
    code_id: string;
    code_name: string;
    code_order: number;
    crtr_dt: string;
    mapping_code: string;
    no: number;
    parent_code_group_id: string;
    upd_dt: string;
    use_yn: string;
}
