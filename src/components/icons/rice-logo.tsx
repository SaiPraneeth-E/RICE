import type { SVGProps } from 'react';

export function RiceLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 20"
      fill="currentColor"
      aria-label="RICE Bharat Logo"
      {...props}
    >
      <text x="0" y="15" fontFamily="var(--font-geist-sans), Arial, sans-serif" fontSize="16" fontWeight="bold" className="text-primary">
        RICE
      </text>
      <text x="48" y="15" fontFamily="var(--font-geist-sans), Arial, sans-serif" fontSize="16" fontWeight="normal" className="text-foreground">
        Bharat
      </text>
    </svg>
  );
}
