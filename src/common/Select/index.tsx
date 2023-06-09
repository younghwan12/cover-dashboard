import { Select as AntdSelect, SelectProps } from "antd";

interface CustomSelectProps extends SelectProps {
  placeholder?: string | boolean | number;
}

export const Select = (props: CustomSelectProps) => {
  return (
    <AntdSelect
      className="min-w-[200px] max-w-[200px]"
      {...props}
      placeholder={props.placeholder ? props.placeholder : "선택"}
    />
  );
};

export const Option = AntdSelect.Option;
