'use client';

import ButtonLink from '@/components/atoms/ButtonLink';
import Image from 'next/image';
import Title from '@/components/atoms/Title';
import Text from '@/components/atoms/Text';
import MailForm from '@/components/molecules/MailForm';

export default function Footer() {
    return (
        <footer className="bg-brand-1 text-white">
            <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex flex-col gap-2.5">
                    <Title element="h2">
                        Contact Us
                    </Title>
                    <Title element="h3" className="text-2xl lg:text-4xl font-bold">
                        널리 퍼트리고 싶은 맛집이 있나요?
                        <br />
                        지금 바로 메일 주세요!
                    </Title>
                    <Text>홍익인간의 뜻으로 만들어진 맛집 지도</Text>
                </div>
                <div className="w-full flex flex-col gap-2.5">
                    <MailForm />
                </div> 
                <div className="flex gap-5 lg:col-span-2">
                    <ButtonLink variant="text" href="https://github.com/Starfish-122/CNX" target="_blank" className="flex items-center gap-2.5 text-gray-900 dark:text-gray-100">
                        <Image
                            src="/cnx-github.png"
                            alt="cnx github"
                            width={82}
                            height={30}
                            className="w-6 h-6"
                        />
                        Github
                    </ButtonLink>
                    <ButtonLink variant="text" href="https://www.notion.so/React-1d542c76ec4c8066aad3d0d50a9f9f7c?source=copy_link" target="_blank" className="flex items-center gap-2.5 text-gray-900 dark:text-gray-100">
                        <Image
                            src="/cnx-notion.png"
                            alt="cnx github"
                            width={82}
                            height={30}
                            className="w-6 h-6"
                        />Notion
                    </ButtonLink>
                </div>
            </div>
        </footer>
    );
}
