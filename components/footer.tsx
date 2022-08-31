import { NextPage } from "next";
import Link from "next/link";

type Props = {};

const Footer: NextPage<Props> = () => {
    return (
        <footer className="z-40 bg-slate-800 ring-1 ring-gray-700 shadow-sm">
            <div className="container mx-auto max-w-4xl pt-8 pb-3 flex flex-col justify-center items-center text-slate-400">
                <div className="flex flex-row justify-center items-center space-x-4">
                    <Link href="/">
                        <span className="underline underline-offset-2 text-sm hover:text-slate-200 cursor-pointer">
                            Create Poll
                        </span>
                    </Link>
                    <Link href="/">
                        <span className="underline underline-offset-2 text-sm hover:text-slate-200 cursor-pointer">
                            View Polls
                        </span>
                    </Link>
                    <Link href="/">
                        <span className="underline underline-offset-2 text-sm hover:text-slate-200 cursor-pointer">
                            Profile
                        </span>
                    </Link>
                </div>
                <div className="text-xs mt-4 text-slate-600">
                    Copyright 2022
                </div>
            </div>
        </footer>
    );
};

export default Footer