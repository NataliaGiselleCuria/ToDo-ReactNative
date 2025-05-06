import { themes } from "../styles/theme";

export type ThemeId = keyof typeof themes;

export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    password: string;
    avatar?: string | File;
    // agregá más campos si los tiene
};

export interface List {
    id: number;
    name: string;
    description?: string;
    createdBy: User;
    category: CategoriesList;
    scheduleStartDate: boolean;
    scheduleStartTime: boolean;
    startDate: Date;
    startTime?:Date;
    scheduleEndDate: boolean;
    scheduleEndTime: boolean;
    endDate?: Date;
    endTime?:Date;
    participants: User[];
    permissions: PermissionsOptions;
    allowedUsers: User[];
    items: Item[];
    progress: number;
    compete?: boolean;
    status?: StatusList;
}

export interface Item {
    idList: number
    id: number;
    name: string;
    subcategory?: string;
    description?: string;
    createdBy: User;
    scheduleStartDate: boolean;
    startDate: Date;
    scheduleEndDate: boolean;
    endDate?: Date;
    duration?: string;
    state: ItemState;
    assignment?: User[];
    owner?: User;
    note?: Note[];
    priority?: Priority;
    image?: string;
    record: HistoryChanges[]
}

export interface Note {
    id: number;
    user: User
    date: Date
    text?: string,
    image?: string,
    audio?: string
}

export interface HistoryChanges {
    id: number;
    type: string
    user: User
    date: Date
    content: string
}

export enum CategoriesList {
    shopping = "Compras",
    gift = "Regalos",
    task = "Tareas",
    others = "Otras"
}

export const categoryItemName: Record<CategoriesList, string> = {
    [CategoriesList.shopping]: "producto",
    [CategoriesList.gift]: "regalo",
    [CategoriesList.task]: "tarea",
    [CategoriesList.others]: "ítem"
};

export enum PermissionsOptions {
    onlyMe = "solo yo",
    all = "todos",
    some = "algunos"
}

export enum ItemState {
    notComplete = "no completado",
    inProsses = "en proceso",
    completed = "completado",

}

export enum StatusList {
    active = "active",
    archives = "archived",
    completed = "completed"
}

export const SubcategoriesByCategory: Record<CategoriesList, string[]> = {
    [CategoriesList.shopping]: ["carnes", "verduras", "lácteos"],
    [CategoriesList.gift]: ["ropa", "electrodomésticos", "libros"],
    [CategoriesList.task]: ["limpieza", "trabajo", "estudio"],
    [CategoriesList.others]: [] // ← permite escribir lo que el usuario quiera
};

export enum Priority {
    low = "alta",
    medium = "media",
    high = "baja"
}

export interface UserPreferences {
    listId: number;
    userId: number;
    color: string;
    // futuro: layout, tamaño de letra, orden de items, etc
}

export type ContactStatus = 'pending' | 'accepted' | 'rejected' | 'blocked';

export interface ContactRelation {
    id: number;
    requesterId: number; // El que envía la solicitud
    receiverId: number;  // El que la recibe
    status: ContactStatus;
    blockerId?: number;// Solo presente si status === 'blocked'
    createdAt: Date; // o Date si estás usando fechas JS
    updatedAt: string;
}

export type ContactAction =
    | 'sendRequest'
    | 'cancelRequest'
    | 'acceptRequest'
    | 'rejectRequest'
    | 'blockUser'
    | 'unblockUser';