interface OwnSuggestion {
    id: number,
    title: String,
    content: String,
    category: String,
    postDate: String,
    isAnon: Boolean,
    status: String,
    likes: number
}

export default OwnSuggestion;