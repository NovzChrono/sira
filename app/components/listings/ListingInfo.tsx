'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map'),{
    ssr: false
});

interface listingInfoProps {
    user : SafeUser | null;
    description : string;
    roomCount : number;
    guestCount : number;
    bathroomCount : number;
    category : {
        icon : IconType;
        label : string;
        description : string;
    } | undefined;
    locationValue : string;
}

const ListingInfo : React.FC<listingInfoProps> = ({
    user,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    category,
    locationValue,
}) => {

    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Publié par {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-zinc-500">
                    <div>
                        {guestCount} invité(s)
                    </div>
                    <div>
                        {roomCount} pièce(s)
                    </div>
                    <div>
                        {bathroomCount} salle(s) de bain
                    </div>
                </div>
            </div>
            <hr />
            {
                category && (
                    <ListingCategory
                        icon={category.icon}
                        label={category.label}
                        description={category.description}
                    />
                )
            }
            <hr />
            <div className="text-lg font-light text-zinc-500">
                {description}
            </div>
            <hr />
            <Map center={coordinates} />
        </div>
    );
}
 
export default ListingInfo;