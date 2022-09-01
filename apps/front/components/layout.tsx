import { Menu, MenuItem } from '@mui/material';
import { supabase } from '@yart/shared/api';
import { Button, Dialog, File, Input, NavItem } from '@yart/shared/ui';
import Image from 'next/image';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export interface LayoutProps {
    children: React.ReactNode;
    hiddenLeftBar?: boolean;
}

const Layout = (props: LayoutProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [authenticatedState, setAuthenticatedState] = useState(false);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (supabase.auth.user()) {
            setAuthenticatedState(true);
        }
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                console.log(event);
                if (event === 'SIGNED_IN') {
                    setAuthenticatedState(true);
                }
                if (event === 'SIGNED_OUT') {
                    setAuthenticatedState(false);
                }
            }
        );
        return () => {
            authListener.unsubscribe();
        };
    }, []);

    const handleCollapseNav = () => {
        setCollapsed(!collapsed);
    };
    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            Router.reload();
        } catch (error) {
            console.error(error);
        }
    };
    const handleLogin = () => {
        Router.push('/signin');
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const classNameNavLeft = `bg-dark-400 fixed h-screen z-10 transition-[width] delay-300 top-[54px] ${
        collapsed ? 'w-full sm:w-72' : 'hidden sm:block w-[4.5rem]'
    } ${props.hiddenLeftBar ? 'hidden sm:hidden' : ''}`;

    const classBurgerMenu = collapsed ? 'text-primary-500' : '';
    return (
        <>
            <header
                className={`flex fixed top-0 left-0 right-0 bottom-0 h-14 bg-dark-400 items-center	z-20`}
                role="banner">
                <Button
                    onClick={handleCollapseNav}
                    buttonIcon={'menu-5-line'}
                    className={`bg-transparent border-transparent hover:bg-transparent hover:border-transparent hover:text-primary-500 text-2xl w-12 sm:w-[4.5rem] justify-center focus:bg-transparent focus:outline-none ${classBurgerMenu}`}
                />
                <Button
                    link="/"
                    className={`bg-transparent border-transparent hover:bg-transparent hover:border-transparent hover:text-primary-500 relative !w-12 mr-2 sm:mr-0`}>
                    <Image
                        src={'/images/logo.svg'}
                        alt="Yart - Authentification"
                        layout="fill"
                    />
                </Button>
                <div
                    className={`flex flex-1 text-center h-10 relative items-center justify-center`}>
                    <Input
                        type="text"
                        placeholder="Recherche sur Yart"
                        labelClassName={`text-dark-400`}
                        className={`bg-transparent !h-10 rounded-r-none`}
                        containerClassName={`w-full sm:w-1/3`}
                    />
                    <Button
                        onClick={() => console.log('send search')}
                        buttonIcon={'search-2-line'}
                        className={`!h-10 rounded-l-none focus:bg-transparent focus:outline-none`}
                    />
                </div>
                <Dialog
                    trigger={<Button>+ New</Button>}
                    title="Créer une publication">
                    <File />
                </Dialog>

                <Button
                    onClick={() => console.log('notification')}
                    buttonIcon={'notification-4-line'}
                    className={`bg-transparent border-transparent hover:bg-transparent hover:border-transparent hover:text-primary-500 text-2xl ml-2 sm:ml-0 px-0 sm:px-4  focus:bg-transparent focus:outline-none`}
                />
                <Button
                    buttonIcon={'user-3-line'}
                    className={`bg-transparent border-transparent hover:bg-transparent hover:border-transparent hover:text-primary-500 text-2xl pl-2 sm:pl-4 focus:bg-transparent focus:outline-none`}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                />
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}>
                    {authenticatedState && (
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    )}
                    {!authenticatedState && (
                        <MenuItem onClick={handleLogin}>Login</MenuItem>
                    )}
                </Menu>
            </header>
            <div className={`grid relative w-full`}>
                <div className={classNameNavLeft}>
                    <nav>
                        <ul>
                            <li>
                                <NavItem
                                    label="Home"
                                    picto="home-4-line"
                                    link="/"
                                    className="!w-full truncate"
                                    collapsed={collapsed}
                                />
                            </li>
                            <li>
                                <NavItem
                                    label="Vos favoris"
                                    picto="heart-line"
                                    link="/"
                                    className="!w-full truncate"
                                    collapsed={collapsed}
                                />
                            </li>
                            {/* <li>
                                <NavItem
                                    label="Publication du jour"
                                    picto="calendar-line"
                                    link="/"
                                    className="!w-full truncate"
                                    collapsed={collapsed}
                                />
                            </li> */}
                            <li>
                                <NavItem
                                    label="Catégories"
                                    picto="folders-line"
                                    link="/categories"
                                    className="!w-full truncate"
                                    collapsed={collapsed}
                                />
                            </li>
                            {/* <li>
                                <NavItem
                                    label="Tops"
                                    picto="fire-line"
                                    link="/"
                                    className="!w-full truncate"
                                    collapsed={collapsed}
                                />
                            </li> */}
                        </ul>
                        <ul
                            className={`before:content-[''] before:w-full before:h-px before:bg-primary-500 before:block`}>
                            <li>
                                <NavItem
                                    avatar="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg"
                                    label="Skypell"
                                    picto="fire-line"
                                    link="/"
                                    className="!w-full truncate !px-4"
                                    collapsed={collapsed}
                                />
                            </li>
                            <li>
                                <NavItem
                                    avatar={
                                        'https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg'
                                    }
                                    label="DiimDim"
                                    picto="fire-line"
                                    link="/"
                                    className="!w-full truncate !px-4"
                                    collapsed={collapsed}
                                />
                            </li>
                        </ul>
                    </nav>
                </div>
                {collapsed && (
                    <div
                        className="bg-dark-500/50 fixed top-0 bottom-0 left-0 right-0 z-[1]"
                        onClick={handleCollapseNav}></div>
                )}
                <main
                    className={`mt-[56px] sm:pl-[4.5rem] ${
                        props.hiddenLeftBar ? 'sm:pl-0' : ''
                    }`}>
                    {props.children}
                </main>
            </div>
        </>
    );
};

export default Layout;
