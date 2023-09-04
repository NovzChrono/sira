import { IconType } from "react-icons";

interface listingCategoryProps {
    icon : IconType;
    label : string;
    description : string;
}

const ListingCategory: React.FC<listingCategoryProps> = ({
    icon: Icon,
    label,
    description,
}) => {
    return (
        <div className="fle flex-col gap-6">
            <div className="flex flex-row items-center gap-4">
                <Icon size={40} className="text-zinc-600" />
                <div className="flex flex-col">
                    <div className="text-xl font-semibold">
                        {label}
                    </div>
                    <div className="font-light text-zinc-500">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ListingCategory;