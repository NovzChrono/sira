'use client';

import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "@/app/components/Avatar";
import {useCallback, useState} from "react";
import MenuItem from "@/app/components/navbar/MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import loginModal from "@/app/components/modals/LoginModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signOut} from "next-auth/react";
import {SafeUser} from "@/app/types";
import toast from "react-hot-toast";
import useRentModal from "@/app/hooks/useRentModal";


interface UserMenuProps{
    currentUser?: SafeUser | null;
}
const UserMenu : React.FC<UserMenuProps> = ({currentUser}) => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(()=>{
        setIsOpen(()=> !isOpen);
    },[]);

    const onRent = useCallback(()=>{
        if(!currentUser){
            toast.error('Connectez vous d\'abord');
            return loginModal.onOpen();
        }

        return rentModal.onOpen();

    },[currentUser,loginModal, rentModal])

    return (
       <div className={'relative'}>
            <div className={'flex flex-row items-center gap-3'}>
                <div
                    onClick={onRent}
                    className={'hidden md:block text-sm font-semibold hover:bg-neutral-100 transition cursor-pointer'}>
                    Espace Sira
                </div>
                <div
                    onClick={toggleOpen}
                    className={'p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'}
                >
                     <AiOutlineMenu />
                    <div className={'hidden md:block'}>
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
           {
               isOpen && (
                   <div
                       className={'absolute rounded-xl shadow-md w-[40vw] md:w-11/12 bg-white overflow-hidden right-0 top-12 text-sm'}
                   >
                    <div className={'flex flex-col cursor-pointer'}>
                        {
                            currentUser ? (
                                <>
                                    <MenuItem
                                        onClick={() => {}}
                                        label={'Voyages'}
                                    />
                                    <MenuItem
                                        onClick={() => {}}
                                        label={'Favories'}
                                    />
                                    <MenuItem
                                        onClick={() => {}}
                                        label={'Réservations'}
                                    />
                                    <MenuItem
                                        onClick={() => {}}
                                        label={'Propriétés'}
                                    />
                                    <MenuItem
                                        onClick={rentModal.onOpen}
                                        label={'Espace Sira'}
                                    />
                                    <hr />
                                    <MenuItem
                                        onClick={() => signOut()}
                                        label={'Déconnexion'}
                                    />
                                </>
                            ) : (<>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label={'Connexion'}
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label={'S\'inscrire'}
                                />
                            </>)
                        }
                    </div>
                   </div>
               )
           }
       </div>
    )
}

export default UserMenu;