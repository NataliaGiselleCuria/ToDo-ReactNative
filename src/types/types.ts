import { themes } from "../styles/theme";

export type ThemeId = keyof typeof themes;

//

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
    startTime?: Date;
    scheduleEndDate: boolean;
    scheduleEndTime: boolean;
    endDate?: Date;
    endTime?: Date;
    allDay?: boolean;
    idEventCalendar?: string
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
    scheduleStartTime: boolean;
    startDate: Date;
    startTime?: Date;
    scheduleEndDate: boolean;
    scheduleEndTime: boolean;
    endDate?: Date;
    endTime?: Date;
    idEventCalendar?: string
    duration?: string;
    state: ItemState;
    assignment?: User[];
    owner?: User;
    note?: Note[];
    priority?: Priority;
    record: HistoryChanges[]
}


// 

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

export const SubcategoriesByCategory: Record<CategoriesList, string[]> = {
    [CategoriesList.shopping]: ["Carnes", "Verduras", "Lácteos"],
    [CategoriesList.gift]: ["Ropa", "Electrodomésticos", "Libros"],
    [CategoriesList.task]: ["Limpieza", "Trabajo", "Estudio"],
    [CategoriesList.others]: [] // ← permite escribir lo que el usuario quiera
};

export const categoryItemName: Record<CategoriesList, string> = {
    [CategoriesList.shopping]: "producto",
    [CategoriesList.gift]: "regalo",
    [CategoriesList.task]: "tarea",
    [CategoriesList.others]: "ítem"
};

export enum PermissionsOptions {
    onlyMe = "Solo yo",
    all = "Todos",
    some = "Algunos"
}

export enum ItemState {
    notComplete = "No completado",
    inProsses = "En proceso",
    completed = "Completado",

}

export enum StatusList {
    active = "active",
    archives = "archived",
    completed = "completed"
}

export enum Priority {
    low = "Baja",
    medium = "Media",
    high = "Alta"
}

export const colorMapPriority = {
    [Priority.low]: 'rgb(100, 155, 121)',
    [Priority.medium]: 'rgb(221, 182, 96)',
    [Priority.high]: 'rgb(202, 86, 86)',
}



// Calendario
export interface CalendarData {
    idEventCalendar?: string;
    name?: string;
    description?: string;
    startDate?: Date;
    startTime?: Date;
    endDate?: Date;
    endTime?: Date;
    allDay?: boolean;
}

export interface EventConfigDates {
    startDateEvent?: Date;
    endDateEvent?: Date;
    allDay?: boolean;
}

export interface CalendarEventData {
    idEventCalendar?: string;
    title: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    allDay?: boolean;
}

//

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
