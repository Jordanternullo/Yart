import { Button, Icon, Input } from '@yart/shared/ui';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import Router from 'next/router';
import { supabase } from '@yart/shared/api';

/* eslint-disable-next-line */
export interface SignupProps {}

export function Signup(props: SignupProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        supabase.auth.signUp({ email, password }).then((res) => {
            Router.push('/');
        });
    };
    return (
        <div
            className={`h-screen flex`}
            style={{
                backgroundImage: 'url(/images/authentication/bg.svg)',
            }}>
            <div
                className={` lg:flex bg-white w-full lg:w-9/12 max-w-5xl lg:m-auto`}>
                <div
                    className={`basis-2/5 hidden lg:block relative`}
                    style={{
                        backgroundImage:
                            'url(/images/authentication/bg-left.svg)',
                    }}>
                    <div className={`p-12 bg-dark-400/60 h-full`}>
                        <h1 className={`text-5xl font-title`}>
                            Rejoins la communauté des{' '}
                            <span className={`text-primary-500`}>
                                peintures
                            </span>{' '}
                            de figurine et{' '}
                            <span className={`text-primary-500`}>
                                impression 3D
                            </span>
                        </h1>
                        <h4 className={`mt-12 font-title text-2xl`}>
                            Explore et découvre le travail d’autre pationnés et
                            partage tes réalisations pour faire découvrir ton
                            talent
                        </h4>
                    </div>
                </div>
                <div className={`w-full px-3 py-20 lg:px-20`}>
                    <div className="absolute top-2 left-2">
                        <Image
                            src={'/images/logo.svg'}
                            width={'60px'}
                            height={'60px'}
                            alt="Yart - Authentification"
                        />
                    </div>
                    <h1
                        className={`text-3xl sm:text-4xl font-title text-dark-400 text-center`}>
                        S'inscrire à Yart avec
                    </h1>
                    <div className={`flex justify-center gap-4 mt-6`}>
                        <button
                            className={`bg-dark-100 hover:bg-primary-500 rounded-md w-12 h-12`}>
                            <Icon name="google-fill" className={`text-2xl`} />
                        </button>
                        <button
                            className={`bg-dark-100 hover:bg-primary-500 rounded-md w-12 h-12`}>
                            <Icon name="facebook-fill" className={`text-2xl`} />
                        </button>
                        <button
                            className={`bg-dark-100 hover:bg-primary-500 rounded-md w-12 h-12`}>
                            <Icon name="apple-fill" className={`text-2xl`} />
                        </button>
                    </div>
                    <span
                        className={`text-dark-400 flex justify-between my-6 text-sm before:content-[''] before:w-4/12 before:self-center before:block before:h-px before:bg-primary-500 after:content-[''] after:w-4/12 after:self-center after:block after:h-px after:bg-primary-500`}>
                        ou par email
                    </span>
                    <Input
                        type="text"
                        label="E-mail"
                        placeholder="@email.com"
                        labelClassName={`text-dark-400`}
                        className={`mb-6 bg-transparent`}
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                    />
                    <Input
                        type="password"
                        label="Mot de passe"
                        placeholder="Mot de passe"
                        className={`bg-transparent`}
                        labelClassName={`text-dark-400`}
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                    />
                    <div className={`text-center mt-16`}>
                        <Button
                            className={`w-full mb-3 justify-center`}
                            onClick={handleSubmit}>
                            Se connecter
                        </Button>
                        <p className={`text-dark-400 text-sm`}>
                            Déjà un compte ?{' '}
                            <Link href={'/signin'}>
                                <a className={`text-primary-500 font-bold`}>
                                    connecte-toi
                                </a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
