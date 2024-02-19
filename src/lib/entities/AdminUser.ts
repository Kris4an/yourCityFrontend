interface AdminUser {
    userId: number,
    userName: String,
    role: String,
    email: String,
    school: String | null,
    phone: String | null
}

export default AdminUser;