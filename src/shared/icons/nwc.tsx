import { SVGProps } from 'react';

export function NwcIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M14.002 2.401c0-1.484-1.925-2.066-2.748-.832L3.188 13.668c-.665.997.05 2.332 1.248 2.332h5.566V21.6c0 1.484 1.925 2.067 2.748.832l8.066-12.099C21.48 9.335 20.766 8 19.568 8h-5.566V2.401z"
      ></path>
    </svg>
  );
}
