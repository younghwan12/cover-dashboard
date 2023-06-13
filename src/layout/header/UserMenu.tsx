import { useModal } from "@/components/Modal";
import Link from "next/link";
import { useEffect, useState } from "react";

import { logout } from "@/features/login/redux/loginSlice";
import { UserInfoModal } from "@/features/modal";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";

const UserMenu = ({ userInfo }) => {
  const dispatch = useAppDispatch();

  const [modal, contextHolder] = useModal();
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1140);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    modal.confirm({
      title: "로그아웃 하시겠습니까?",
      onOk() {
        dispatch(logout());
        router.push("/");
      },
    });
  };

  const onClickUserInfo = () => {
    setVisible(true);
  };

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  if (userInfo?.auth) {
    return (
      <>
        <div className="absolute right-6 -top-0.5 flex justify-between cursor-pointer ">
          {contextHolder}
          {isMobile ? (
            <div className="relative">
              <div className="flex">
                <div className="mr-2 flex items-center content-center cursor-auto text-blue-600">
                  <span className="text-black">{userInfo?.user_name}</span> 님
                </div>
                <button className="bg-blue-300 rounded-[50%] p-2 hover:bg-blue-400" onClick={handleMenuToggle}>
                  <AiOutlineUser size="25" className="text-white" />
                </button>
              </div>
              {isMenuOpen && (
                <div className=" w-[150px] absolute right-0 top-12 bg-white z-[10000]">
                  <ul className="text-center text-sm border-[1px] rounded-md">
                    <li className="p-1 border-b-[1px]">
                      <button
                        className="w-full hover:bg-gray-100 p-1 px-2 rounded-md"
                        onClick={() => onClickUserInfo()}
                      >
                        내정보
                      </button>
                    </li>
                    <li className="border-b-[1px] p-1">
                      <button className="w-full hover:bg-gray-100 p-1 px-2 rounded-md" onClick={() => handleLogout()}>
                        로그아웃
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => handleLogout()}
                className="border-[1px] rounded px-[14px] py-[6px] mr-2 bg-gray-100 text-sm hover:bg-gray-200"
              >
                {userInfo?.user_name} 님 로그아웃
              </button>
              <button
                className="border-[1px] rounded px-[14px] py-[6px] bg-slate-50 text-sm hover:bg-gray-200"
                onClick={onClickUserInfo}
              >
                내정보
              </button>
            </>
          )}
        </div>

        <UserInfoModal visible={visible} setVisible={setVisible} />
      </>
    );
  }
  return (
    <>
      <div className="absolute right-6 -top-0.5 flex justify-between cursor-pointer ">
        {isMobile ? (
          <div className="relative">
            <div className="flex">
              <button className="bg-slate-50 rounded-[50%] p-2 hover:bg-gray-200" onClick={handleMenuToggle}>
                <AiOutlineMenu size="25" />
              </button>
            </div>
            {isMenuOpen && (
              <div className=" w-[150px] absolute right-0 top-12 bg-white z-[10000]">
                <ul className="text-center text-sm border-[1px] rounded-md">
                  <li className="p-1 border-b-[1px]">
                    <button
                      className="w-full hover:bg-gray-100 p-1 px-2 rounded-md"
                      onClick={() => router.push("/login")}
                    >
                      로그인
                    </button>
                  </li>
                  <li className="border-b-[1px] p-1">
                    <button
                      className="w-full hover:bg-gray-100 p-1 px-2 rounded-md"
                      onClick={() => router.push("/register")}
                    >
                      회원가입
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="border-[1px] rounded px-[14px] py-[6px] mr-2 bg-gray-100 text-sm hover:bg-gray-200"
            >
              로그인
            </Link>
            <Link
              href="/selogin"
              className="border-[1px] rounded px-[14px] py-[6px] mr-2 bg-gray-100 text-sm hover:bg-gray-200"
            >
              로그인(세션제작중..)
            </Link>
            <Link
              href="/register"
              className="border-[1px] rounded px-[14px] py-[6px] bg-slate-50 text-sm hover:bg-gray-200"
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default UserMenu;
