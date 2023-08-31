'use client';

import Container from '../Container'
import Logo from "@/app/components/navbar/Logo";
import Search from "@/app/components/navbar/Search";
import UserMenu from "@/app/components/navbar/UserMenu";
import {SafeUser} from "@/app/types";
import Categories from "@/app/components/navbar/Categories";

interface NavBarProps{
    currentUser?: SafeUser | null;
}

const NavBar : React.FC<NavBarProps> = ({currentUser}) => {
    return (
            <div className={`fixed w-full bg-white shadow-sm`}>
                <div className={`py-4 border-b-[1px]`}>
                    <Container>
                        <div className={`flex flex-row  items-center justify-between gap-3 md:gap-0`}>
                            <Logo />
                            <Search />
                            <UserMenu currentUser={currentUser} />
                        </div>
                    </Container>
                </div>
                <Categories />
            </div>
    );
}

export default NavBar;