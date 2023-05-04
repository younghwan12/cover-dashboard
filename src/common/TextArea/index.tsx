import React from "react";
import { Input } from "antd";
import type { TextAreaProps } from "antd/lib/input/TextArea";

const TextArea: React.FC<TextAreaProps> = ({
    className,
    size = "middle",
    ...restProps
}) => {
    const classes = ["text-area"];
    if (className) {
        classes.push(className);
    }
    return (
        <Input.TextArea
            {...restProps}
            className={classes.join(" ")}
            autoSize={{ minRows: 3, maxRows: 6 }}
            bordered={true}
        />
    );
};

export default TextArea;
