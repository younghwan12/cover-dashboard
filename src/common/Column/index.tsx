import { Column as PColumn } from "primereact/column";
export { treeNumberTemplate, numberTemplate } from './numberTemplate';

class Column extends PColumn {
    static defaultProps = {
        ...PColumn.defaultProps,
        sortable: true,
    };
}

export default Column;