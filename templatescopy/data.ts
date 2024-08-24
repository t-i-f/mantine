import {
{#each icons}}
  {{ this }},
{{/each}}
} from '@tabler/icons-react';

{{#each data}}
const {{@key}} = [
{{#each nav}}
{
  icon: {{icon}},
  title: "{{title}}",
  description: "{{description}}",
},
{{/each}}
];

{{/each}}
