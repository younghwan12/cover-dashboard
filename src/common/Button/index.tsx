import { Button as AnddButton, ButtonProps } from 'antd'

interface CustomButtonPros {
    title?: string;
}

const Button = (props: ButtonProps) => {
    return <AnddButton {...props} />
}

export const SaveButton = (props: ButtonProps) => {
    return <AnddButton {...props}>저장</AnddButton>
}

export const DownButton = (props: ButtonProps & CustomButtonPros) => {
    return (
        <AnddButton {...props}>
            {props.children ? props.children : "다운로드"}
        </AnddButton>
    )
}

export const RefreshButton = (props: ButtonProps) => {
    return (
        <AnddButton
            {...props}
        />
    )
}

export default Button;