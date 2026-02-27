type NavItem = { label: string; path: string };
type NavLinksProps = { items: NavItem[] };

export const NavLinks = ({ items }: NavLinksProps) => {
  return (
    <>
      {items.map((item) => (
        <a
          key={item.path}
          href={item.path}
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          {item.label}
        </a>
      ))}
    </>
  );
};
