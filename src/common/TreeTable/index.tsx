import { TreeTable as PTreeTable, TreeTableProps } from 'primereact/treetable'
import { useState } from 'react'
import { SectionHead, SectionBody } from '@/common/layouts'
import { Space } from '@/common/components'

interface CustomTreeTableProps {
    extraButtons?: React.ReactNode;
    title?: React.ReactNode;
    tooltip?: React.ReactNode;
    treemode?: boolean;
    onRefresh?: () => void;
}

const TreeTable: React.FC<TreeTableProps & CustomTreeTableProps> = (props) => {

    const [rowNum, setRowNum] = useState(10)

    return (
        <>
            {props.treemode !== undefined && props.treemode == true ? null : (
                <SectionHead
                    title={props.title ? props.title : ""}
                    tooltip={props.tooltip && props.tooltip}
                    onRefresh={props.onRefresh}
                    className="mb-8"
                >
                    <Space>{props?.extraButtons && props.extraButtons}</Space>
                </SectionHead>
            )}
            <SectionBody>
                <PTreeTable
                    rows={rowNum}
                    paginator={
                        props.value !== undefined &&
                            props.value !== null &&
                            props.value.length > rowNum
                            ? true
                            : false
                    }
                    emptyMessage="조회한 데이터가 없습니다."
                    scrollable={true}
                    {...props}
                    columnResizeMode="fit"
                    resizableColumns
                />
            </SectionBody>
        </>
    )
}

export default TreeTable

interface TreeTableColHeaderProps {
    title?: React.ReactNode;
}
export const TreeTableColHeader = ({ title }: TreeTableColHeaderProps) => {
    return <span className='tree-table-col-header'>{title}</span>
}