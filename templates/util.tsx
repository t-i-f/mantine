"use client";

import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { Icon } from "@tabler/icons-react";
import { ReactNode } from "react";
import classes from "./HeaderMegaMenu.module.css";
import MenuItem, { MenuMobile } from "./MegaMenu";
import { 
  {{#each data}}
    {{ this }}Config,
  {{/each}}  
} from "./data";


export type MenuLink = {
  icon: Icon;
  title: string;
  description: string;
};

export type MenuItemProps = {
  title: string;
  desc: string;
};

export type MenuNodes = {
  Web: ReactNode;
  Mobile: ReactNode;
};

export type MenuConfig = {
  title: string;
  desc: string;
  nav: Array<MenuLink>;
};

export const generateLinks = (mockdata: Array<MenuLink>): ReactNode =>
  mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon className={classes.iconBig} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

export const generateComps = (config: MenuConfig): MenuNodes => {
  const links = generateLinks(config.nav);
  return {
    Web: (
      <MenuItem title={config.title} desc={config.desc}>
        {links}
      </MenuItem>
    ),
    Mobile: (
      <MenuMobile title={config.title} desc={config.desc}>
        {links}
      </MenuMobile>
    ),
  };
};

{{#each data}}
export const {{ this }} = generateComps({{ this }}Config);
{{/each}}
