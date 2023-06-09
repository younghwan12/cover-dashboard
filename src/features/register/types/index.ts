export interface RegisterRes {
  isDupId: string;
}
export interface RegiIDCheckReq {
  user_id: string;
}
export interface RegisterReq {
  user_id: string;
  pwd: string;
  user_name: string;
  email: string;
  company: string;
  phone_number: string;
  project_name: string;
  nexcore_solution: string;
  create_route: string;
}
