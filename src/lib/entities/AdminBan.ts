interface AdminBan {
    startDate: String,
    banLength: number,
    reason: String,
    adminName: String | null,
    adminEmail: String | null
}

export default AdminBan;