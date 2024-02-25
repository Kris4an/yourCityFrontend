interface AdminBan {
    startDate: string,
    banLength: number,
    reason: string,
    adminName: string | null,
    adminEmail: string | null
}

export default AdminBan;