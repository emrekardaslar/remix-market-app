import { ItemType } from "antd/lib/menu/hooks/useItems";
import React from "react";
import { NotificationOutlined } from '@ant-design/icons';
import sidebarMenu from "../../mock/sidebarItems";

export default function MainPageViewModel() {
    function getSidebarItems (): ItemType[] {
        const sidebar = sidebarMenu;
        return sidebar.items.map((item => {
            return {
              key: item.name,
              icon: React.createElement(NotificationOutlined),
              label: item.name,
              children: item.subItems.map(subItem => {
                return {
                  key: subItem.name,
                  label: subItem.name
                }
              })
            }
          }))
        }
    return {
        getSidebarItems
    }
}