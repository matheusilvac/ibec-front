import {useUserStore} from "@/context/userContext/UserContext";
import {useRouter} from "next/navigation";

export const HandleUserFunc = () => {
    const {clearUser} = useUserStore();
    const router = useRouter();

    const handleLogout = () => {
        clearUser();
        router.push("/")
    }

    return{
        handleLogout
    }
}