"use client";

import {
  Anchor,
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Group,
  HoverCard,
  SimpleGrid,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import type { FC, PropsWithChildren } from "react";
import classes from "./HeaderMegaMenu.module.css";
import { MenuItemProps } from "./util";

const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({ title, desc, children }) => {
  return (
    <HoverCard
      width={600}
      position="bottom"
      radius="md"
      shadow="md"
      withinPortal
    >
      <HoverCard.Target>
        <a href="#" className={classes.link}>
          <Center inline>
            <Box component="span" mr={5}>
              {title}
            </Box>
            <IconChevronDown className={classes.iconSmall} />
          </Center>
        </a>
      </HoverCard.Target>

      <HoverCard.Dropdown className={classes.overflowHidden}>
        <Group justify="space-between" px="md">
          <Text fw={500}>{title}</Text>
          <Anchor href="#" fz="xs">
            View all
          </Anchor>
        </Group>

        <Divider my="sm" />

        <SimpleGrid cols={2} spacing={0}>
          {children}
        </SimpleGrid>

        <div className={classes.dropdownFooter}>
          <Group justify="space-between">
            <div>
              <Text fw={500} fz="sm">
                {title}
              </Text>
              <Text size="xs" c="dimmed">
                {desc}
              </Text>
            </div>
            <Button variant="default">Get started</Button>
          </Group>
        </div>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export const MenuMobile: FC<PropsWithChildren<MenuItemProps>> = ({ title, children, desc }) => {
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  return (
    <>
      <UnstyledButton className={classes.link} onClick={toggleLinks}>
        <Center inline>
          <Box component="span" mr={5}>
            {title}
          </Box>
          {linksOpened ? (
            <IconChevronUp className={classes.iconSmall} />
          ) : (
            <IconChevronDown className={classes.iconSmall} />
          )}
        </Center>
      </UnstyledButton>
      <Collapse in={linksOpened}>{children}</Collapse>
    </>
  );
};

export default MenuItem;
