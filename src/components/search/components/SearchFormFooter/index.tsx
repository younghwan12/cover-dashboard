interface ISearchFormFooterProps {
    children: React.ReactNode;
    className?: string;
}
const SearchFormFooter = (props: ISearchFormFooterProps) => {
    return (
        <div
            className={`searchForm-footer center ${props.className && props.className ? props.className : null
                }`}
        >
            {props.children}
        </div>
    )
}
export default SearchFormFooter