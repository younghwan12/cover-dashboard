import { DatePicker as AntdDatePicker } from "antd";
import { FC } from "react";
import { RangePickerProps } from "antd/es/date-picker";

export const RangePicker: FC<RangePickerProps> = (props) => {
  return <AntdDatePicker.RangePicker {...props} />;
};
