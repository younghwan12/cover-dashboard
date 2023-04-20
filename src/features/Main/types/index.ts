// 요청
export interface UserProfileReq {
    jwt: string;
    login_id: string;
    user_id: string;
}

export interface AuthInfo {
    auth_name: string;
    project_no: string;
    user_id: string;
    auth: string;
    nexcore_solution_name: string;
    project_name: string;
}

export interface MyInfo {
    nexcore_solution: string;
    auth_name: string;
    user_id: string;
    auth: string;
    user_name: string;
    mail_active_status: string;
    last_project_no: string;
    company: string;
    phone_number: string;
    nexcore_solution_name: string;
    project_name: string;
    email: string;
}

export interface UserProfileResList {
    myInfo: MyInfo[];
    prjAuth: AuthInfo[];
}
