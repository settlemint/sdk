import { NavItem, type NavItemType } from "./sidebar-navigation-item";

export function NavGroup({ items, className }: { items: NavItemType[]; className?: string }) {
  return (
    <nav className={className}>
      {items.map((item) => (
        <NavItem key={item.label} {...item} />
      ))}
    </nav>
  );
}
