import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';

export function useLogout() {
    const router = useRouter();

    return function () {
        logout();

        router.replace('/login');
    };
}
