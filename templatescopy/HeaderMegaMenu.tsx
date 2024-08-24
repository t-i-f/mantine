"use client";

import Image from "next/image";
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  rem
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderMegaMenu.module.css";
{{#each top}}
import {{ this }} from "./{{ this }}";  
{{/each}}


export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <a href="{{meta.home}}" className={classes.logo}>
            <Image height={40} width={150} src="{{meta.logo}}" alt="Logo" />
          </a>

          <Group h="100%" gap={0} visibleFrom="sm">
          
          {{#each top}}
            <{{ this }} />
          {{/each}}

          </Group>

          <Group>
            <Button>Login</Button>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          {{#each top}}
          <{{ this }}.Mobile />
          {{/each}}

        </ScrollArea>
      </Drawer>
    </Box>
  );
}
