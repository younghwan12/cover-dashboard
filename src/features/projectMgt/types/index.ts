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
  project_no?: string;
}

export interface ProjectAddReq extends LogEx {
  project_no?: string;
  project_name?: string;
  start_dt?: string;
  end_dt?: string;
  company?: string;
  business_price?: string;
  business_desc?: string;
  sales_manager?: string;
  solution_charger?: string;
  free_maintenance_start_dt?: string;
  free_maintenance_end_dt?: string;
  pay_maintenance_yn?: string;
  pay_maintenance_price?: string;
  regular_maintenance_state?: string;
  customer_charger?: string;
  project_status?: string;
  solutions?: [
    {
      nexcore_solution_cd?: string;
      solution_price?: string;
    }
  ];
  create_route?: string;
}

export interface Prjsolutions {
  nexcore_solution_cd?: string;
  solution_price?: number;
}

export interface PrjDetailReq extends LogEx {
  project_no?: string;
}
export interface PrjDetailRes {
  projectInfo: [
    {
      project_no?: string;
      project_name?: string;
      start_dt?: string;
      end_dt?: string;
      company?: string;
      business_price?: string;
      business_desc?: string;
      sales_manager?: string;
      solution_charger?: string;
      free_maintenance_start_dt?: string;
      free_maintenance_end_dt?: string;
      pay_maintenance_yn?: string;
      pay_maintenance_price?: string;
      regular_maintenance_state?: string;
      customer_charger?: string;
      project_status?: string;
    }
  ];
  solutionInfo: [
    {
      nexcore_solution_cd: string;
      project_no?: string;
      solution_price: string;
    }
  ];
}

export interface ProjectDelReq extends LogEx {
  delData:
    | [
        {
          project_no: string;
        }
      ]
    | string;
}
