'use client';

import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';
import Button from '@/components/atoms/Button';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function MailForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // 성공/에러 메시지 자동 숨김 처리
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        setStatus('idle');
      }, 3000); // 3초 후 메시지 숨김

      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert('닉네임을 입력해주세요.');
      return false;
    }
    if (!formData.message.trim()) {
      alert('상세 설명을 입력해주세요.');
      return false;
    }
    return true;
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    // 필수값 유효성 검사
    if (!validateForm()) {
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    try {
      setStatus('loading');
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
      setStatus('success');
      resetForm(); // 폼 데이터 초기화
    } catch {
      setStatus('error');
    }
  };

  return (
    <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-2.5">
      <div className="flex w-full gap-2.5">
        <Input 
          name="name" 
          placeholder="닉네임 *" 
          type="text" 
          value={formData.name}
          onChange={handleInputChange}
          required={true}
          validateRequired={false}
        />
        <Input
          name="email" 
          placeholder="이메일" 
          type="email" 
          value={formData.email}
          onChange={handleInputChange}
          className="flex-1"
        />
      </div>
      <Textarea 
        placeholder="맛집 내용 *" 
        rows={5} 
        size="full" 
        name="message" 
        value={formData.message}
        onChange={handleInputChange}
        required={true}
        validateRequired={false}
      />
      <Button type="submit" loading={status === 'loading'} className="self-end">
        제출
      </Button>

      {status === 'success' && <p className="text-green-600" role="status">메일이 전송되었습니다.</p>}
      {status === 'error' && <p className="text-red-600" role="alert">메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.</p>}
    </form>
  );
};