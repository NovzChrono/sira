'use client';

import {IconType} from "react-icons";
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback} from "react";
import qs from 'query-string'

interface categoryBoxProps {
    label : string,
    description? : string,
    icon : IconType,
    selected?: boolean,
}
const CategoryBox : React.FC<categoryBoxProps> = ({label, description, icon : Icon, selected}) => {

    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {}

        if (params){
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery : any = {
            ...currentQuery,
            category : label,
        }

        if(params?.get('category') === label){
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query : updatedQuery,
        }, {skipNull : true});

        router.push(url)

    }, [label, params, router])

    return (
        <div
            onClick={handleClick}
            className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-gray-800 transition cursor-pointer 
                ${selected ? 'border-b-gray-800' : 'border-b-transparent'} 
                ${selected ? 'text-gray-800' : 'text-gray-500'}
            `}
        >
            <Icon size={26} />
            <div className={'font-medium text-sm'}>
                {label}
            </div>
        </div>
    )
}

export default CategoryBox;