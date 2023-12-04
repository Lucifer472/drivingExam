import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { category, driving, about } from "@/constant";
import { School, Store } from "lucide-react";
import Link from "next/link";

const DesktopMenu = () => {
  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="px-6 cursor-pointer">
            <span className="flex items-center gap-2 rounded-lg">
              <School />
              Driving Knowledge
            </span>
          </MenubarTrigger>
          <MenubarContent>
            {driving.labels.map((l, index) => (
              <Link href={`/driving/${driving.links[index]}`} key={l}>
                <MenubarItem>{l}</MenubarItem>
                {index < driving.labels.length - 1 && <MenubarSeparator />}
              </Link>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      {category.labels.map((l, index) => {
        const Icon = category.icons[index];
        return (
          <Link href={`${category.links[index]}/1`} key={l}>
            <Button variant="outline">
              <span className="flex items-center gap-2">
                <Icon />
                {l}
              </span>
            </Button>
          </Link>
        );
      })}
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="px-6 cursor-pointer">
            <span className="flex items-center gap-2 rounded-lg">
              <Store />
              More
            </span>
          </MenubarTrigger>
          <MenubarContent>
            {about.labels.map((l, index) => (
              <Link href={about.links[index]} key={l}>
                <MenubarItem>{l}</MenubarItem>
                {index < about.labels.length - 1 && <MenubarSeparator />}
              </Link>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};

export default DesktopMenu;
