import type PublicUser from "./PublicUser";

interface PublicSuggestion{
    id: number,
    user: PublicUser | null,
    title: string,
    content: string,
    category: string,
    isAnon: boolean,
    likes: number,
    postDate: string,
    isLikedByUser: boolean | null
}

export default PublicSuggestion;