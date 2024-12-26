import AdminNavbar
 from "../components/AdminNavbar";

const AdminDashboard = function () {
    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <h1 className="text-4xl font-bold text-gray-900 text-center">
                    Welcome to Admin Dashboard
                </h1>
            </div>
        </div>
    )
}

export default AdminDashboard;

