"use client";

import {
  Group,
  Text,
  ThemeIcon,
  UnstyledButton
} from "@mantine/core";
import classes from "./HeaderMegaMenu.module.css";

export const generateLinks = (mockdata) => mockdata.map((item) => (
  <UnstyledButton className={classes.subLink} key={item.title}>
    <Group wrap="nowrap" align="flex-start">
      <ThemeIcon size={34} variant="default" radius="md">
        <item.icon
          className={classes.iconBig}
        />
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