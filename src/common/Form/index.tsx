import { Form as AntdForm, FormProps, FormItemProps } from "antd";
import { FC, ReactNode } from "react";

const validateMessages = {
    required: "필수값입니다.",
};

interface Props extends FormProps {
    children: ReactNode;
}

export const Form: FC<Props> = ({ children, ...props }) => {
    return (
        <AntdForm {...props} validateMessages={validateMessages}>
            {children}
        </AntdForm>
    );
};

export const FormItem: FC<FormItemProps> = (props) => {
    return <AntdForm.Item {...props} />;
};

export const useForm = AntdForm.useForm;
