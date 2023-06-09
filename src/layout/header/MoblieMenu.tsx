import React, { useState } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { UserInfoModal } from "@/features/modal";
const MobileMenu = ({ userInfo }) => {
  const [visible, setVisible] = useState(false);
  const items: MenuProps["items"] = [
    {
      key: "dashboard",
      label: "Dashboard",
    },
    {
      key: "issueMgt",
      label: "유지보수 및 기술지원",
      children: [
        {
          key: "issueMgt_1",
          label: "문의",
        },
      ],
    },
    {
      key: "system",
      label: "시스템 관리",
      children: [
        {
          key: "codeMgt",
          label: "코드정보",
        },
        {
          key: "user",
          label: "사용자",
        },
        {
          key: "projectMgt",
          label: "프로젝트",
        },
        {
          key: "sysMgt",
          label: "설정",
        },
      ],
    },
    {
      key: "license",
      label: "라이센스 관리",
    },
    {
      key: "1",
      label: "내 정보",
      onClick: () => setVisible(true),
    },
  ];

  return (
    <>
      <Menu mode="horizontal" defaultSelectedKeys={["1"]} items={items} />
      <UserInfoModal visible={visible} setVisible={setVisible} />
    </>
  );
};

export default MobileMenu;
