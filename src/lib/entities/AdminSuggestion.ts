import type AdminUser from "./AdminUser";

interface AdminSuggestion {
    suggestionId: number,
    title: string,
    content: string,
    postDate: string,
    isAnon: boolean,
    status: string,
    category: string,
    user: AdminUser | null,
    likes: number
}

export default AdminSuggestion;