import { ComponentType } from "react";
import { Form as AntdForm, FormProps } from "antd";

type FormItemProps = React.ComponentProps<typeof AntdForm.Item>;

const validateMessages = {
  required: "필수값입니다.",
};

interface FormPropsWithChildren extends FormProps {
  children: React.ReactNode;
  List?: typeof AntdForm.List;
}

export const Form = (props: FormPropsWithChildren) => {
  return <AntdForm {...props} validateMessages={validateMessages} />;
};

export const useForm = AntdForm.useForm;

export const FormItem: ComponentType<FormItemProps> = (props) => {
  return <AntdForm.Item {...props} />;
};

Form.List = AntdForm.List;
