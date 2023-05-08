import { LogEx, Paging } from "@/common/types";

export interface SettingListResList {
    list: SettingList[];
}

export interface SettingDetailResList {
    detailInfo: SettingList[];
}

export interface SettingListReq extends LogEx {
    code_id?: string;
    use_yn?: string;
    detail?: string;
}

interface SettingList {
    code_id: string;
    code_name: string;
    detail: string;
    no: number;
    use_yn: string;
}
