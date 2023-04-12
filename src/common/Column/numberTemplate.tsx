import { numberFormat } from "@/common/utils/numberUtil"
import { ColumnBodyOptions, ColumnProps } from "primereact/column"


export const numberTemplate: ColumnProps["body"] = (
    data: any,
    options: ColumnBodyOptions
) => {
    return <div className="al-r">{numberFormat(data[options.field])}</div>
};

/**
 * TreeTable Data가 숫자인 경우 numberTemplate을 body prop으로 전달
 * @param data
 * @param options
 * @returns
 */
export const treeNumberTemplate: ColumnProps["body"] = (
    data: any,
    options: ColumnBodyOptions
) => {
    return <div className="al-r">{numberFormat(data[options.field])}</div>
}