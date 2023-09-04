import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";


interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({
    listingId,
    currentUser,

} : IUseFavorite) => {

    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavoried = useMemo(() =>{
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    },[currentUser, listingId]);

    const toggleFavorite = useCallback(async (
        e : React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if(!currentUser)
           return loginModal.onOpen();

        try{

            let request;

            if(hasFavoried)
                request = () => axios.delete(`/api/favorites/${listingId}`);
            else
                request = () => axios.post(`/api/favorites/${listingId}`);

            await request();
            router.refresh();
            toast.success('Success')

        }catch (err) {
            toast.error('Quelque choses s\'est mal passée!');
        }

    },[currentUser, hasFavoried, listingId, loginModal, router])

    return {
        hasFavoried,
        toggleFavorite,
    }
}

export default useFavorite;