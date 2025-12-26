import React, { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <section className={`ring w-full min-h-4 h-max ring-grey rounded-md ${className}`}>
      {children}
    </section>
  );
}
Card.Header = function Header({ children, className }: CardProps) {
  return (
    <header
      className={`border-b border-grey py-4 flex-between px-5 ${className}`}
    >
      {children}
    </header>
  );
};

Card.Content = function Content({ className, children }: CardProps) {
  return <main className={`p-5 ${className}`}>{children}</main>;
};

Card.Footer = function Footer({ className, children }: CardProps) {
  return <footer className={`px-5 ${className}`}>{children}</footer>;
};
