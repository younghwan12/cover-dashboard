export interface UserInfo {
    type: string;
    jwt?: string;
}

interface Jwt {
    sub: string;
    user_id: string;
    auth: string;
    ip: string;
    last_project_no: string;
    exp: number;
}

interface Project {
    project_no: string;
    project_status: string;
    project_name: string;
}

interface Menu {
    first_ord: number;
    up_menu_id: string;
    menu_name: string;
    menu_desc: string;
    menu_ord: number;
    menu_id: string;
    menu_location: string;
    menu_depth: number;
    up_menu_name?: string;
}

export interface UserInfoDetail {
    auth: string;
    jwt: Jwt;
    last_project_no: string;
    menu: Menu[];
    prjAuth: string;
    project: Project[];
    user_name: string;
}
