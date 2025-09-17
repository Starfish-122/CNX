'use client';

import Link from 'next/link';
import Image from 'next/image';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';

export default function Footer() {
    return (
        <footer className="bg-brand-1 text-white">
            <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex flex-col gap-2.5">
                    <h2>Contact Us</h2>
                    <h3 className="text-2xl lg:text-4xl font-bold">
                        널리 퍼트리고 싶은 맛집이 있나요?
                        <br />
                        지금 바로 메일 주세요!
                    </h3>
                    <p className="">홍익인간의 뜻으로 만들어진 맛집 지도</p>
                </div>
                <div className="w-full flex flex-col gap-2.5">
                    <Input placeholder="이메일을 입력해주세요." size="full" type="email" />
                    <Textarea placeholder="상세 설명을 입력하세요" rows={5} size="full" />
                </div>
                <div className="flex gap-5 lg:col-span-2">
                    <Link
                        className="flex items-center gap-2.5 pb-2 hover:border-b border-white"
                        href="https://github.com/Starfish-122/CNX"
                        target="_blank"
                    >
                        <Image
                            src="/cnx-github.png"
                            alt="cnx github"
                            width={82}
                            height={30}
                            className="w-6 h-6"
                        />
                        Github
                    </Link>
                    <Link
                        className="flex items-center gap-2.5 pb-2 hover:border-b border-white"
                        href="https://www.notion.so/React-1d542c76ec4c8066aad3d0d50a9f9f7c?source=copy_link"
                        target="_blank"
                    >
                        <Image
                            src="/cnx-notion.png"
                            alt="cnx github"
                            width={82}
                            height={30}
                            className="w-6 h-6"
                        />
                        Notion
                    </Link>
                </div>
            </div>
        </footer>
    );
}
