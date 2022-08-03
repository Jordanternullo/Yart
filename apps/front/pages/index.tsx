import { Button, Input, NavItem } from '@yart/shared/ui';
import Image from 'next/image';
import { useState } from 'react';

export function Index() {
    const [collapsed, setCollapsed] = useState(false);
    /*
     * Replace the elements below with your own.
     *
     * Note: The corresponding styles are in the ./index.scss file.
     */
    const handleCollapseNav = () => {
        setCollapsed(!collapsed);
    };

    const classNameNavLeft = `bg-dark-400 fixed h-screen z-10 transition-[width] delay-300 top-[54px] ${
        collapsed ? 'w-full sm:w-72' : 'hidden sm:block w-[4.5rem]'
    }`;
    return (
        <>
            <header
                className={`flex fixed top-0 left-0 right-0 bottom-0 h-14 bg-dark-400 items-center	z-20`}
                role="banner">
                <Button
                    onClick={handleCollapseNav}
                    buttonIcon={'menu-5-line'}
                    className={`bg-transparent border-transparent hover:bg-transparent hover:border-transparent hover:text-primary-500 text-2xl w-12 sm:w-[4.5rem] justify-center`}
                />
                <Button
                    link="/"
                    className={`bg-transparent border-transparent hover:bg-transparent hover:border-transparent hover:text-primary-500 relative !w-12`}>
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
                        className={`!h-10 rounded-l-none	`}
                    />
                </div>
                <Button
                    onClick={() => console.log('notification')}
                    buttonIcon={'notification-4-line'}
                    className={`bg-transparent border-transparent hover:bg-transparent hover:border-transparent hover:text-primary-500 text-2xl px-0 sm:px-4`}
                />
                <Button
                    onClick={() => console.log('user')}
                    buttonIcon={'user-3-line'}
                    className={`bg-transparent border-transparent hover:bg-transparent hover:border-transparent hover:text-primary-500 text-2xl pl-2 sm:pl-4`}
                />
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
                            <li>
                                <NavItem
                                    label="Publication du jour"
                                    picto="calendar-line"
                                    link="/"
                                    className="!w-full truncate"
                                    collapsed={collapsed}
                                />
                            </li>
                            <li>
                                <NavItem
                                    label="Catégories"
                                    picto="folders-line"
                                    link="/"
                                    className="!w-full truncate"
                                    collapsed={collapsed}
                                />
                            </li>
                            <li>
                                <NavItem
                                    label="Tops"
                                    picto="fire-line"
                                    link="/"
                                    className="!w-full truncate"
                                    collapsed={collapsed}
                                />
                            </li>
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
                                    avatar="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg"
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
                        className="bg-dark-500/50 fixed top-0 bottom-0 left-0 right-0 z-0"
                        onClick={handleCollapseNav}></div>
                )}
                <main></main>
            </div>
        </>
    );
}

export default Index;
