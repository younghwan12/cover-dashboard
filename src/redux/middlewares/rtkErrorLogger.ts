import { Modal } from "antd"
import { Middleware, MiddlewareAPI, isRejectedWithValue } from "@reduxjs/toolkit"

export const rtkErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        if (isRejectedWithValue(action)) {
            if (window !== undefined) {
                if (action.payload.status === 404) {
                    return;
                }
                const modal = Modal.error({})

                modal.update({
                    title: `error ${action.payload.data?.errCode}`,
                    content: `${action?.payload.data?.errMsg}`
                })
            }
        }
        return next(action)
    }

export default {}