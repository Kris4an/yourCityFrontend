interface OwnSuggestion {
    id: number,
    title: string,
    content: string,
    category: string,
    postDate: string,
    isAnon: boolean,
    status: string,
    likes: number
}

export default OwnSuggestion;