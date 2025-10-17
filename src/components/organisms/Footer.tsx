'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import ButtonLink from '@/components/atoms/ButtonLink';
import { Icon } from '@/components/atoms';
import Image from 'next/image';
import Title from '@/components/atoms/Title';
import Text from '@/components/atoms/Text';
import MailForm from '@/components/molecules/MailForm';

export default function Footer() {
    const [isTop, setIsTop] = useState(true);
    const handleScroll = () => {
        if(window.scrollY > 100) {
            setIsTop(false);
        } else {
            setIsTop(true);
        }
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    });
    return (
        <footer className="footer">
            <div className="container mx-auto px-6 py-20">
                <Title element="h2" className="text-base font-normal mb-5">
                    Contact Us
                </Title>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="flex flex-col lg:justify-between">
                        <div>
                            <Title element="h3" className="text-2xl lg:text-3xl font-bold">
                                널리 퍼트리고 싶은 맛집이 있나요?
                                <br />
                                지금 바로 메일 주세요!
                            </Title>
                            <Text className="mt-2.5">홍익인간의 뜻으로 만들어진 맛집 지도</Text>
                        </div>
                        <div className="flex gap-5 mt-5 lg:mt-0 lg:col-span-2">
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
                    <div className="w-full flex flex-col gap-2.5">
                        <MailForm />
                    </div>
                </div>
            </div>
            <div onClick={scrollToTop} className={clsx(isTop ? 'btn-gotop' : 'btn-gotop visible', 'fixed', 'bottom-6', 'right-6', 'z-100')}>
                <Icon name="arrow_upward_alt" size="lg" className="text-gray-100"/>
            </div>
        </footer>
    );
}
