import React from "react";
import { IssuesSearch } from "@/features/issues/component";
import { IssuesTable } from "@/features/issues/component";

const IssuesContainer = () => {
    return (
        <>
            <IssuesSearch />
            <IssuesTable />
        </>
    );
};

export default IssuesContainer;
