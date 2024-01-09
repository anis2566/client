import React from "react";
import {
  AttachMoney,
  Category,
  Chat,
  Dashboard,
  HourglassBottom,
  People,
  PeopleOutline,
  ShoppingCartOutlined,
  AddShoppingCart,
  ShoppingBag,
  Discount,
  ShoppingCart,
  PaidOutlined,
  HeadsetMic,
  AccountCircle,
  Create,
  List,
  HourglassEmpty,
  DoDisturb,
  VerifiedUserOutlined,
  AcUnit,
} from "@mui/icons-material";

export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: <Dashboard sx={{ color: "#0288D1" }} />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Scout",
    icon: <People sx={{ color: "#0288D1" }} />,
    role: "admin",
    children: [
      {
        title: "Create",
        icon: <Create color="warning" fontSize="small" />,
        path: "/admin/scout/create",
      },
      {
        title: "List",
        icon: <List color="warning" fontSize="small" />,
        path: "/admin/scout/list",
      },
      {
        title: "Request",
        icon: <HourglassEmpty color="warning" fontSize="small" />,
        path: "/admin/scout/request",
      },
      {
        title: "Cancelled",
        icon: <DoDisturb color="warning" fontSize="small" />,
        path: "/admin/scout/cancelled",
      },
      {
        title: "Verified",
        icon: <VerifiedUserOutlined color="warning" fontSize="small" />,
        path: "/admin/scout/verified",
      },
    ],
  },
  {
    id: 3,
    title: "Unit",
    icon: <AcUnit sx={{ color: "#0288D1" }} />,
    role: "admin",
    path: "/admin/scout/unit",
  },

  // Scouts Navs
  {
    id: 9,
    title: "Dashboard",
    icon: <Dashboard sx={{ color: "#0288D1" }} />,
    role: "scout",
    path: "/scout/dashboard",
  },
  {
    id: 10,
    title: "Profile",
    icon: <AccountCircle sx={{ color: "#0288D1" }} />,
    role: "scout",
    path: "/scout/profile",
  },
];
