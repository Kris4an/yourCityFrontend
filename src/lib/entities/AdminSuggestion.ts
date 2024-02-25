import type AdminUser from "./AdminUser";

interface AdminSuggestion {
    suggestionId: number,
    title: String,
    content: String,
    postDate: String,
    isAnon: boolean,
    status: String,
    category: String,
    user: AdminUser | null,
    likes: number
}

export default AdminSuggestion;