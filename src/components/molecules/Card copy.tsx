import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  className?: string;
}

export default function Card({ children, title, description, image, className }: CardProps) {
  return (
    <div className={clsx("card bg-white rounded-lg shadow-md overflow-hidden w-full", className)}>
      {image && ( 
      <div className="card-header">
        <img src={image} alt={title} />
      </div>
      )}
      {children && (
        <div className="card-body p-4">
          {children}
        </div>
      )}
    </div>
  );
}