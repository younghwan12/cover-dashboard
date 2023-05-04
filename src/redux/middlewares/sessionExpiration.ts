import { Middleware } from "@reduxjs/toolkit";
import { destroyCookie } from "nookies";
import { message } from "antd";

const sessionExpirationMiddleware: Middleware =
    (store) => (next) => (action) => {
        if (
            action.type.endsWith("/rejected") &&
            action.error.message === "token expired"
        ) {
            // 만료된 토큰이 감지되면 실행됩니다.
            destroyCookie(null, "jwt"); // 쿠키 삭제
            store.dispatch({ type: "logout" }); // 리덕스 상태 초기화
            message.error("세션이 만료되었습니다. 다시 로그인해주세요."); // 메시지 띄우기
        }
        return next(action);
    };

export default sessionExpirationMiddleware;
