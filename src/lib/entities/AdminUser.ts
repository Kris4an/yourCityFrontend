interface AdminUser {
    userId: number,
    userName: string,
    role: string,
    email: string,
    school: string | null,
    phone: string | null
}

export default AdminUser;