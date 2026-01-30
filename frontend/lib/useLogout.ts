import { useRouter } from 'next/navigation';
import { logoutApi } from '@/lib/api';
import { logout } from '@/lib/auth';

export function useLogout() {
    const router = useRouter();

    return async function () {
        await logoutApi();
        logout();
        router.replace('/login');
    };
}
