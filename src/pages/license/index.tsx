import Layout from "@/layout/main/Layout";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React from "react";
import { Button } from "antd";
import { LicenseContainer } from "@/features/license/component";

const LicensePage = () => {
    return (
        <Layout>
            <LicenseContainer />
        </Layout>
    );
};

export default LicensePage;
