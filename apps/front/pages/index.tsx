import { Button, Input } from '@yart/shared/ui';
import Image from 'next/image';

export function Index() {
    /*
     * Replace the elements below with your own.
     *
     * Note: The corresponding styles are in the ./index.scss file.
     */
    return (
        <>
            <header
                className={`flex fixed top-0 left-0 right-0 bottom-0 h-14 bg-dark-400 items-center	z-20`}
                role="banner">
                <Button
                    onClick={() => console.log('expand menu')}
                    buttonIcon={'menu-5-line'}
                    className={`bg-transparent border-transparent hover:bg-transparent hover:border-transparent hover:text-primary-500 text-2xl !w-[4.5rem] justify-center`}
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
                        containerClassName={`w-1/3`}
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
                    className={`bg-transparent border-transparent hover:bg-transparent hover:border-transparent hover:text-primary-500 text-2xl`}
                />
                <Button
                    onClick={() => console.log('user')}
                    buttonIcon={'user-3-line'}
                    className={`bg-transparent border-transparent hover:bg-transparent hover:border-transparent hover:text-primary-500 text-2xl`}
                />
            </header>
            <div className={`grid relative w-full`}>
                <div className={`bg-dark-400 w-[4.5rem] h-screen fixed`}>
                    <nav>
                        <ul>
                            <li>
                                <Button
                                    onClick={() => console.log('user')}
                                    buttonIcon={'user-3-line'}
                                    className={`bg-transparent border-transparent hover:bg-transparent hover:border-transparent hover:text-primary-500 text-2xl`}
                                />
                            </li>
                            <li>
                                <Button
                                    onClick={() => console.log('user')}
                                    buttonIcon={'user-3-line'}
                                    className={`bg-transparent border-transparent hover:bg-transparent hover:border-transparent hover:text-primary-500 text-2xl`}
                                />
                            </li>
                        </ul>
                    </nav>
                </div>
                <main></main>
            </div>
        </>
    );
}

export default Index;
