import { Form as AntdForm, FormProps } from "antd";

const validateMessages = {
    required: "필수값입니다."
}

export const Form = (props: FormProps) => {
    return <AntdForm {...props} validateMessages={validateMessages} />
}

export const useForm = AntdForm.useForm;

type FormItemPropsType = typeof AntdForm.Item;
export const FormItem: FormItemPropsType = (props) => {
    return <AntdForm.Item {...props} />
}