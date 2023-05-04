import { DatePicker } from "antd";
import React from "react";

interface CustomRangePickerProps {
    title?: string;
    disabled?: boolean;
}

const RangePicker = React.forwardRef<any, CustomRangePickerProps>(
    ({ title, ...rest }, ref) => {
        return (
            <div>
                {title && <div>{title}</div>}
                <DatePicker.RangePicker
                    {...rest}
                    ref={ref}
                    format="YYYY-MM-DD"
                />
            </div>
        );
    }
);

RangePicker.displayName = "RangePicker";

export default RangePicker;
