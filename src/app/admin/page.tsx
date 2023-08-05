import { getAuthSession } from '@/lib/auth';
import Heading from '@/ui/Heading';

const Admin = async () => {
    const session = await getAuthSession();
    if (session?.user.role !== 'ADMIN') {
        throw new Error('You need to be an admin to access this page');
    }

    return (
        <div className="container pt-20">
            <Heading size="sm">Admin page</Heading>
        </div>
    );
};

export default Admin;
