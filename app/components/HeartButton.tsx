'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";

interface heartButtonProps{
    currentUser?: SafeUser | null;
    listingId : string;
}

const HeartButton: React.FC<heartButtonProps> = ({currentUser, listingId}) => {

    const { hasFavoried, toggleFavorite } = useFavorite({
        listingId,
        currentUser,
    });

    return ( 
    <div
        onClick={toggleFavorite}
        className="relative hover:opacity-80 transition cursor-pointer"
    >
            <AiOutlineHeart
                size={28}
                className="fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillHeart 
                size={27}
                className={hasFavoried ? `fill-rose-500` : ` fill-zinc-500/70`}
            />
    </div> 
    );
}
 
export default HeartButton;