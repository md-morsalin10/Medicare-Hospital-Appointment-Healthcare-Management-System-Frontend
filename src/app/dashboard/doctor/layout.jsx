import { verifyRole } from "@/lib/core/session";

const DoctorLayout = async ({ children }) => {
    await verifyRole('doctor');

    return children;
};

export default DoctorLayout;