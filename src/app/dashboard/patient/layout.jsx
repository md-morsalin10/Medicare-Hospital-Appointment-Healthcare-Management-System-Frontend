import { verifyRole } from "@/lib/core/session";

const PatientLayout = async ({ children }) => {
    await verifyRole('patient');

    return children;
};

export default PatientLayout;