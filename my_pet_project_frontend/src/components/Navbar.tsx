/** biome-ignore-all lint/performance/noImgElement: <explanation> **/
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import {
    UserIcon,
    PencilSquareIcon,
    EnvelopeIcon,
    Cog8ToothIcon,
    QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';


export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const userEmail = session?.user?.email || 'Profile menu';
    const menuRef = useRef<HTMLDivElement>(null);

    const navItems = ["Home", "Team", "Feature", "Blog", "About", "Contact"];

    const isLoginPage = pathname === '/login';
    const isRegisterPage = pathname === '/register';

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <header className="relative z-50 flex min-h-[70px] border-gray-700 border-b bg-[#121212] px-4 py-4 tracking-wide shadow-md sm:px-10">
            <div className="flex w-full flex-wrap items-center justify-between gap-5">

                <Link href="/" className="flex items-center space-x-2 max-sm:hidden">
                    <svg
                        fill="#ffffff"
                        stroke="#ffffff"
                        height="40"
                        width="40"
                        viewBox="0 0 256 238"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                        role="img"
                        aria-labelledby="logoTitle"
                    >
                        <title id="logoTitle">CryptocurrencyTracker Logo</title>
                        <path d="M130.6,70.7l0.1-19c5.4,0,22.3-1.6,22.2,9.6C152.9,72.1,136,70.7,130.6,70.7z M157.2,90.9L157.2,90.9 c0-12.3-20.2-10.5-26.6-10.6l-0.1,21C137,101.3,157.2,102.7,157.2,90.9z M59.8,77.1c0-41.1,32.9-74.5,74-74.5 c41.1,0,74.2,33.2,74.2,74.2c0,41.1-33.4,74.2-74.2,74.2S59.8,117.9,59.8,77.1z M115.1,73c-0.3,0-0.7,0-1,0L114,98 c-0.2,1.2-0.9,3.1-3.6,3.1c0.1,0.1-6.9,0-6.9,0l-1.9,11.4l12.4,0c2.3,0,4.6,0.1,6.8,0.1l-0.1,15.8l9.5,0l0.1-15.6 c2.6,0.1,5.1,0.1,7.6,0.1l-0.1,15.6l9.5,0l0.1-15.8c16-0.9,27.2-4.9,28.7-19.9c1.2-12.1-4.5-17.5-13.6-19.7c5.5-2.8,9-7.7,8.2-16h0 c-1-11.3-10.8-15.1-23-16.2l0.1-15.6l-9.5,0l-0.1,15.2c-2.5,0-5.1,0-7.6,0.1l0.1-15.3l-9.5,0L121,40.8c-2.1,0-4.1,0.1-6.1,0.1l0,0 l-13.1-0.1l0,10.2c0,0,7-0.1,6.9,0c3.9,0,5.1,2.3,5.5,4.2L114.1,73C114.4,73,114.7,73,115.1,73z M107.9,220.5h43 c10.6,0,20.5-4.9,27.1-11.8l57.2-57.2c4.5-4.5,4.7-12.1,0-16.8c-4.4-4.4-11.8-4.5-16.6,0.3L183.5,170c0.8,2.2,1.4,4.9,1.3,7.2 c0,5.2-2,10.2-5.7,13.9s-8.6,5.8-13.9,5.7l-49.6,0.1c-2.2,0-4-1.7-4-4c0-2.2,1.7-4,3.8-3.8h49.8c6.5,0,11.8-5.3,11.8-11.8 c0-6.5-5.3-11.8-11.8-11.8l-61.9-0.2c-10.3,0-19.5,4.2-26.2,10.9l-60,61.8h65.9l10.7-11.7C97.4,222.6,102.4,220.5,107.9,220.5z" />
                    </svg>
                    <span className="select-none font-bold text-2xl text-white">
                        CryptocurrencyTracker
                    </span>
                </Link>

                <Link href="/" className="hidden max-sm:flex">
                    <svg
                        fill="#ffffff"
                        stroke="#ffffff"
                        height="40"
                        width="40"
                        viewBox="0 0 256 238"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                        role="img"
                        aria-labelledby="logoTitle"
                    >
                        <title id="logoTitle">CryptocurrencyTracker Logo</title>
                        <path d="M130.6,70.7l0.1-19c5.4,0,22.3-1.6,22.2,9.6C152.9,72.1,136,70.7,130.6,70.7z M157.2,90.9L157.2,90.9 c0-12.3-20.2-10.5-26.6-10.6l-0.1,21C137,101.3,157.2,102.7,157.2,90.9z M59.8,77.1c0-41.1,32.9-74.5,74-74.5 c41.1,0,74.2,33.2,74.2,74.2c0,41.1-33.4,74.2-74.2,74.2S59.8,117.9,59.8,77.1z M115.1,73c-0.3,0-0.7,0-1,0L114,98 c-0.2,1.2-0.9,3.1-3.6,3.1c0.1,0.1-6.9,0-6.9,0l-1.9,11.4l12.4,0c2.3,0,4.6,0.1,6.8,0.1l-0.1,15.8l9.5,0l0.1-15.6 c2.6,0.1,5.1,0.1,7.6,0.1l-0.1,15.6l9.5,0l0.1-15.8c16-0.9,27.2-4.9,28.7-19.9c1.2-12.1-4.5-17.5-13.6-19.7c5.5-2.8,9-7.7,8.2-16h0 c-1-11.3-10.8-15.1-23-16.2l0.1-15.6l-9.5,0l-0.1,15.2c-2.5,0-5.1,0-7.6,0.1l0.1-15.3l-9.5,0L121,40.8c-2.1,0-4.1,0.1-6.1,0.1l0,0 l-13.1-0.1l0,10.2c0,0,7-0.1,6.9,0c3.9,0,5.1,2.3,5.5,4.2L114.1,73C114.4,73,114.7,73,115.1,73z M107.9,220.5h43 c10.6,0,20.5-4.9,27.1-11.8l57.2-57.2c4.5-4.5,4.7-12.1,0-16.8c-4.4-4.4-11.8-4.5-16.6,0.3L183.5,170c0.8,2.2,1.4,4.9,1.3,7.2 c0,5.2-2,10.2-5.7,13.9s-8.6,5.8-13.9,5.7l-49.6,0.1c-2.2,0-4-1.7-4-4c0-2.2,1.7-4,3.8-3.8h49.8c6.5,0,11.8-5.3,11.8-11.8 c0-6.5-5.3-11.8-11.8-11.8l-61.9-0.2c-10.3,0-19.5,4.2-26.2,10.9l-60,61.8h65.9l10.7-11.7C97.4,222.6,102.4,220.5,107.9,220.5z" />
                    </svg>
                </Link>

                {!(isLoginPage || isRegisterPage) ? (
                    <>
                        <nav
                            id="collapseMenu"
                            className="max-lg:hidden max-lg:before:fixed max-lg:before:inset-0 max-lg:before:z-50 max-lg:before:bg-black max-lg:before:opacity-50 lg:block"
                        >
                            <button
                                id="toggleClose"
                                type="button"
                                className="fixed top-2 right-4 z-[100] flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-700 bg-[#121212] lg:hidden"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5 fill-gray-300"
                                    viewBox="0 0 320.591 320.591"
                                    role="img"
                                    aria-labelledby="closeIconTitle"
                                >
                                    <title id="closeIconTitle">Close icon</title>
                                    <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
                                    <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
                                </svg>
                            </button>

                            <ul className="z-50 gap-x-4 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:h-full max-lg:w-1/2 max-lg:min-w-[300px] max-lg:space-y-3 max-lg:overflow-auto max-lg:bg-[#121212] max-lg:p-6 max-lg:shadow-lg lg:flex">
                                <li className="mb-6 hidden max-lg:block">
                                    <Link href="/">
                                        <Image
                                            src="https://readymadeui.com/readymadeui.svg"
                                            alt="logo"
                                            className="w-36"
                                            width={144}
                                            height={40}
                                            priority
                                        />
                                    </Link>
                                </li>
                                {navItems.map((text) => {
                                    const href = text === "Home" ? "/" : `/${text.toLowerCase()}`;
                                    const isActive = pathname === href;

                                    return (
                                        <li
                                            key={text}
                                            className="px-3 max-lg:border-gray-700 max-lg:border-b max-lg:py-3"
                                        >
                                            <Link
                                                href={href}
                                                className={`block font-medium text-[15px] hover:text-blue-300 ${isActive ? "text-blue-400" : "text-gray-300"
                                                    }`}
                                            >
                                                {text}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                        {!session ? (
                            <div className="flex space-x-4 max-lg:ml-auto">
                                <Link href="/login" passHref>
                                    <button
                                        type="button"
                                        className="cursor-pointer rounded-full border border-gray-600 bg-transparent px-4 py-2 font-medium text-gray-300 text-sm tracking-wide transition-all hover:bg-gray-700"
                                    >
                                        Login
                                    </button>
                                </Link>

                                <Link href="/register">
                                    <button
                                        type="button"
                                        className="cursor-pointer rounded-full border border-blue-500 bg-blue-600 px-4 py-2 font-medium text-sm text-white tracking-wide transition-all hover:bg-blue-700"
                                    >
                                        Sign up
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="relative ml-auto inline-block text-left" ref={menuRef}>
                                <button
                                    type="button"
                                    className="relative flex cursor-pointer items-center rounded-full px-1.5 py-1.5 text-sm text-white transition-colors duration-300 hover:bg-gray-700"
                                    id="user-menu-button"
                                    aria-expanded={open}
                                    aria-haspopup="true"
                                    onClick={() => setOpen(!open)}
                                >
                                    <span className="sr-only">Open user menu</span>

                                    <img
                                        className="size-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="User avatar"
                                    />
                                </button>

                                <div
                                    className={clsx(
                                        'absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-gray-800 shadow-xl ring-1 ring-black/20 transition-all duration-200',
                                        open
                                            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                                            : '-translate-y-2 pointer-events-none scale-95 opacity-0'
                                    )}
                                >
                                    <div className="border-gray-700 border-b px-5 py-3">
                                        <span
                                            className="block select-none font-semibold text-gray-400 text-xs uppercase tracking-widest"
                                        >
                                            Account
                                        </span>
                                        <h1
                                            className="mt-1 max-w-full truncate font-mono font-semibold text-sm text-white"
                                            title={userEmail}
                                        >
                                            {userEmail}
                                        </h1>
                                    </div>
                                    <ul className="py-0 font-medium text-gray-300 text-sm">
                                        {[
                                            { icon: UserIcon, label: 'My profile', href: '/' },
                                            { icon: PencilSquareIcon, label: 'Edit profile', href: '/' },
                                            { icon: EnvelopeIcon, label: 'Inbox', href: '/' },
                                            { icon: Cog8ToothIcon, label: 'Settings', href: '/' },
                                            { icon: QuestionMarkCircleIcon, label: 'Help', href: '/' },
                                        ].map(({ icon: Icon, label, href }, i) => (
                                            <li
                                                key={label}
                                                className={clsx(
                                                    "flex cursor-pointer items-center gap-3 rounded-md px-5 py-3 transition-colors duration-150",
                                                    "transition-colors duration-500 hover:bg-gray-700 hover:text-white",
                                                    i > 0 ? "border-gray-700 border-t transition-colors duration-500" : ''
                                                )}
                                            >
                                                <Icon className="h-5 w-5 flex-shrink-0 text-gray-400 transition-colors duration-150 group-hover:text-white" />
                                                <a href={href} className="flex-1 truncate">
                                                    {label}
                                                </a>
                                            </li>
                                        ))}
                                        <li className="border-gray-700 border-t last:mb-0">
                                            <button
                                                type="button"
                                                onClick={() => signOut({ callbackUrl: '/login' })}
                                                className="flex w-full items-center gap-3 rounded-md px-5 py-3 font-semibold text-red-500 transition-colors duration-150 hover:bg-red-700 hover:text-red-100 focus:outline-none focus:ring-2 focus:ring-red-400"
                                            >
                                                <ArrowRightIcon className="h-5 w-5 flex-shrink-0" />
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        <button
                            type="button"
                            id="toggleOpen"
                            className="cursor-pointer lg:hidden"
                            aria-label="Open menu"
                        >
                            <svg
                                className="h-7 w-7"
                                fill="#cbd5e1"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-labelledby="menuIconTitle"
                            >
                                <title id="menuIconTitle">Menu icon</title>
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </>
                ) : (
                    <div className="flex space-x-4 max-lg:ml-auto">
                        <a
                            href="https://github.com/M1dDler/my_pet_project"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer rounded-full border border-gray-600 bg-transparent px-4 py-2 font-medium text-gray-300 text-sm tracking-wide transition-all hover:bg-gray-700"
                        >
                            FAQ
                        </a>
                    </div>
                )}
            </div>
        </header>
    );
}
