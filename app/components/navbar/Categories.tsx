'use client';

import Container from '@/app/components/Container'
import {TbBeach, TbMountain, TbPool} from "react-icons/tb";
import {GiBarn, GiIsland, GiWindmill} from "react-icons/gi";
import {MdOutlineVilla} from "react-icons/md";
import CategoryBox from "@/app/components/CategoryBox";
import {usePathname, useSearchParams} from "next/navigation";
import {BiHotel} from "react-icons/bi";

export const categories = [
    {
        label : 'Plage',
        icon : TbBeach,
        description : ''
    },
    {
        label : 'Hotel',
        icon : BiHotel,
        description : ''
    },
    {
        label : 'Residence',
        icon : MdOutlineVilla,
        description : ''
    },
    {
        label : 'Pays',
        icon : TbMountain,
        description : ''
    },
    {
        label : 'Ville',
        icon : GiBarn,
        description : ''
    },
    {
        label : 'Tourisme',
        icon : GiIsland,
        description : ''
    },

]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage){
        return null;
    }

    return (
        <Container>
            <div
                className={"pt-4 flex flex-row items-center justify-between overflow-x-auto"}
            >
                {
                    categories.map((item) => (
                        <CategoryBox
                            key={item.label}
                            label={item.label}
                            description={item.description}
                            icon={item.icon}
                            selected={category === item.label}
                        />
                    ))
                }
            </div>
        </Container>
    )
}

export default Categories