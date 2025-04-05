import { DrawerParamList } from "./navigationTypes";

export interface DrawerItemType {
    icon: any;
    label: string;
    navigateTo: keyof DrawerParamList;
}

export interface DrawerLayoutProps {
    icon: any;
    label: string;
    navigateTo: keyof DrawerParamList;
}

// si van a quedar iguales, en un futuro unificarlas:

// export interface DrawerItemProps {
//     icon: any;
//     label: string;
//     navigateTo: keyof DrawerParamList;
//   }
  
//   export type DrawerItemType = DrawerItemProps;
//   export type DrawerLayoutProps = DrawerItemProps;

// o cambiando el nombre:

// export interface DrawerItem {
//     icon: any;
//     label: string;
//     navigateTo: keyof DrawerParamList;
//   }