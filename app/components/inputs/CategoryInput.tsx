
'use client';

import {IconType} from "react-icons";

interface categoryInputProps {
    label : String;
    selected? : boolean;
    icon : IconType;
    onClick : (value: string) => void;

}

const CategoryInput : React.FC<categoryInputProps> = ({onClick, selected, icon : Icon, label}) => {
    return (
        <div
            onClick={() => onClick(label.toString())}
            className={`
                rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer 
                ${selected ? 'border-gray-900' : 'border-zinc-200'}
            `}
        >
            <Icon size={30} />
            <div className={'font-semibold'}>
                {label}
            </div>
        </div>
    )
}

export default CategoryInput;