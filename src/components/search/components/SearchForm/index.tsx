import { Space } from "@/common/";

interface SearchFormProps {
    children: React.ReactNode;
    className?: string;
    title?: React.ReactNode;
    tooltip?: React.ReactNode;
    extraButtons?: React.ReactNode;
}

const SearchForm = (props: SearchFormProps) => {
    return (
        <div
            className={`searchForm ${
                props.className && props.className ? props.className : null
            }`}
        >
            {props.title !== undefined ||
            props.tooltip !== undefined ||
            props.extraButtons !== undefined ? (
                <div className="searchForm-header">
                    <div className="searchForm-title">
                        <span className="searchForm-title-text">
                            {props.title}
                        </span>

                        {props.tooltip !== undefined ? (
                            <Space className="gap-0">
                                {props.tooltip && props.tooltip !== undefined
                                    ? props.tooltip
                                    : null}
                            </Space>
                        ) : null}
                    </div>

                    {props.extraButtons !== undefined ? (
                        <Space>{props.extraButtons}</Space>
                    ) : null}
                </div>
            ) : null}

            {props.children}
        </div>
    );
};

export default SearchForm;
