import Layout from "@/components/Layout";

const AdminLayout = ({ children }) => {
    return (
        <Layout>
            <div className="admin-container">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                {children}
            </div>
        </Layout>
    );
};

export default AdminLayout;
