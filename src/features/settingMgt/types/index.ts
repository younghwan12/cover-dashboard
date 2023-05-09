import { LogEx, Paging } from "@/common/types";

export interface SettingListResList {
    list: SettingList[];
}

export interface SettingMenuListRes {
    list: MenuList[];
}

export interface SettingDetailResList {
    detailInfo: SettingList[];
}

export interface MenuListReq extends LogEx {
    menu_id?: string;
    menu_name?: string;
    menu_ord?: number;
    menu_desc?: string;
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

interface MenuList {
    first_ord: number;
    menu_depth: number;
    menu_desc: string;
    menu_id: string;
    menu_location: string;
    menu_name: string;
    menu_name2: string;
    menu_ord: number;
    up_menu_id: string;
}
