import {
{{#each icons}}
  {{ this }},
{{/each}}
} from '@tabler/icons-react';

{{#each data}}
export const {{@key}}Config = {
  title: "{{@key}}",
  desc: "{{this.[0]}}",
  nav: [
{{#each this}}
{{#if @first}}
{{else}}
{
  icon: {{icon}},
  title: "{{title}}",
  description: "{{description}}",
},
{{/if}}
{{/each}}
]};

{{/each}}
