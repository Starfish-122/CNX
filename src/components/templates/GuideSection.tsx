'use client';
import React from 'react';
import clsx from 'clsx';
import { Title } from '@/components/atoms';

export default function GuideSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx('mb-12', className)}>
      <Title element="h2" className="text-xl font-semibold mb-3">{title}</Title>
      {children}
    </section>
  );
}