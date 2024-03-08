import { IconType } from "../SvgIcon/iconTypes";

type menuItemType = {
  title: string;
  path: string;
  icon: IconType;
  child?: { title: string; path: string }[];
};

const menusList: menuItemType[] = [
  {
    title: "Project",
    path: "/dashboard/projects",
    icon: "projectIcon"
  },
  {
    title: "Master",
    path: "/dashboard/master",
    icon: "mastersIcon",
    child: [
      {
        title: "Project Type",
        path: "/dashboard/master/projectType"
      },
      {
        title: "Collaborator",
        path: "/dashboard/master/collaborator"
      },
      {
        title: "Beneficiary",
        path: "/dashboard/master/beneficiary"
      },
      {
        title: "Domain",
        path: "/dashboard/master/domain"
      },
      {
        title: "Sub-Domain",
        path: "/dashboard/master/subDomain"
      },
      {
        title: "Stakeholder",
        path: "/dashboard/master/stakeholder"
      },
      {
        title: "Intervention Type",
        path: "/dashboard/master/interventionType"
      },
      {
        title: "District",
        path: "/dashboard/master/district"
      },
      {
        title: "Block",
        path: "/dashboard/master/block"
      },
      {
        title: "Village",
        path: "/dashboard/master/village"
      },
      {
        title: "School",
        path: "/dashboard/master/school"
      },
      {
        title: "Gram Panchayat",
        path: "/dashboard/master/gramPanchayat"
      },
      {
        title: "Anganwadi",
        path: "/dashboard/master/anganWadi"
      }
    ]
  }
];

export default menusList;
