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
  ThemeIcon,
  UnstyledButton,
  rem
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { 
{{#each icons}}
  {{ this }},
{{/each}}
  IconChevronDown,
  IconChevronUp
} from '@tabler/icons-react';
import classes from "./HeaderMegaMenu.module.css";

const mockdata = [
{{#each nav}}
{
  icon: {{icon}},
  title: "{{title}}",
  description: "{{description}}",
},
{{/each}}
];

const links = mockdata.map((item) => (
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

const {{title}} = () => {

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
              {{{title}}}
            </Box>
            <IconChevronDown className={classes.iconSmall} />
          </Center>
        </a>
      </HoverCard.Target>

      <HoverCard.Dropdown className={classes.overflowHidden}>
        <Group justify="space-between" px="md">
          <Text fw={500}>{{{title}}}</Text>
          <Anchor href="#" fz="xs">
            View all
          </Anchor>
        </Group>

        <Divider my="sm" />

        <SimpleGrid cols={2} spacing={0}>
          {links}
        </SimpleGrid>

        <div className={classes.dropdownFooter}>
          <Group justify="space-between">
            <div>
              <Text fw={500} fz="sm">
                {{{title}}}
              </Text>
              <Text size="xs" c="dimmed">
                {{{description}}}
              </Text>
            </div>
            <Button variant="default">Get started</Button>
          </Group>
        </div>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

const {{title}}Mobile = () => {
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  return (<>
    <UnstyledButton className={classes.link} onClick={toggleLinks}>
    <Center inline>
      <Box component="span" mr={5}>
        {{{title}}}
      </Box>
      {linksOpened ? <IconChevronUp className={classes.iconSmall} /> : <IconChevronDown className={classes.iconSmall} />}
    </Center>
  </UnstyledButton>
  <Collapse in={linksOpened}>{links}</Collapse>
  </>
  )
}

{{title}}.Mobile = {{title}}Mobile;

export default {{title}};
