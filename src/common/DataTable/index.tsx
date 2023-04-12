import { DataTable as PDataTable, DataTableStateEvent, DataTableProps } from 'primereact/datatable'

import { SectionHead, SectionBody } from '@/common/layouts'

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Option, Select } from '../Select'
import Button from '../Button'
import Space from '../Space'

interface ICustomDataTableProps extends DataTableProps {
    extraButtons?: React.ReactNode;
    tooltip?: React.ReactNode;
    extraForm?: React.ReactNode;
    refresh?: React.ReactNode;
    onRefresh?: () => void;
    onRowClick?: any;
}

const DataTable: React.FC<ICustomDataTableProps> = (props) => {
    const { totalRecords } = props;
    const [first, setFirst] = useState(0);


    const [tableCellSize, setTableCellSize] = useState<DataTableProps['size']>("normal");

    const handleCellSizeBtn1 = useCallback(() => {
        setTableCellSize(tableCellSize === "normal" ? "small" : "normal")
    }, [tableCellSize])

    const handleRowNumChange = useCallback((newValue: number) => {
        setRows(newValue)
    }, [])

    const handlePage = (e: DataTableStateEvent) => {
        setFirst(e.first);
        props.onPage(e);
    };
    const isPaginatorTable = useMemo(() => {
        if (totalRecords && totalRecords > 0) {
            return true;
        }
    }, [totalRecords,])

    const handleOnclick = (e) => {
        if (
            e.originalEvent.target.classList.contains("p-selection-column") ||
            e.originalEvent.target.classList.contains("p-checkbox-icon")
        )
            return false;


        props.onRowClick && props.onRowClick(e);
    }
    return (
        <>
            <SectionHead
                title={props.title ? props.title : ""}
                tooltip={props.tooltip && props.tooltip}
                onRefresh={props.onRefresh}
            >
                <Space>
                    {props?.extraButtons && props.extraButtons}
                    {props.value && Array.isArray(props.value) ? (
                        <Select
                            onChange={handleRowNumChange}
                        >
                        </Select>
                    ) : null}

                    {props.value &&
                        Array.isArray(props.value) &&
                        props.value.length >= 10 ? (
                        <Button
                            onClick={handleCellSizeBtn1}
                        >

                        </Button>
                    ) : null
                    }
                </Space>
            </SectionHead>
            {props.extraForm !== undefined ? (<div>{props.extraForm}</div>) : null}
            {/* <SectionBody> */}
            <PDataTable
                size={tableCellSize}
                paginator={isPaginatorTable}
                {...props}
                emptyMessage="데이터가 없습니다."
                onPage={handlePage}
                first={first}
                onRowClick={
                    props.selectionMode !== "single"
                        ? handleOnclick
                        : () => {
                            return false
                        }
                }
            />
            {/* </SectionBody> */}
        </>
    )

}

export default DataTable;