import Link from "next/link";

interface LinkProps {
  children: React.ReactNode;
  href: string;
  target?: string;
}

const LinkUnderline: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <span className="hover-underline inline font-semibold">
      <Link {...props}>{children}</Link>
    </span>
  );
};

export default LinkUnderline;
