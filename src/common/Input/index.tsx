import { Input as AntdInput, InputProps } from 'antd'

const Input = (props: InputProps) => {
    return <AntdInput allowClear {...props} />
};
export default Input

type AntdInputSearchType = typeof AntdInput.Search;

export const Search: AntdInputSearchType = (props) => {
    return <AntdInput.Search placeholder='검색' {...props} />
}

type AntdInputPasswordType = typeof AntdInput.Password.defaultProps;

export const Password = (props: AntdInputPasswordType) => {
    return <AntdInput.Password placeholder='비밀번호' {...props} />
}

export { default as AppCodeInput } from './AppCodeInput'