import { Select as AntdSelect, SelectProps } from 'antd'

export const Select = (props: SelectProps) => {
    return <AntdSelect {...props} placeholder="선택" />;
}


export const Option = AntdSelect.Option