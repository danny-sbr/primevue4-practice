import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'primevue4-practice-doc',
  description: 'primevue4 practice description',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
        collapsed: true,
      },
      {
        text: 'Getting Started',
        items: [
          {
            text: 'Introduction',
            link: '/primevue_doc/GettingStarted/Introduction',
          },
        ],
      },
      {
        text: 'Configuration',
        items: [
          { text: 'Options', link: '/primevue_doc/Configuration/Options' },
          {
            text: 'AutoImport',
            link: '/primevue_doc/Configuration/AutoImport',
          },
        ],
      },
      {
        text: 'Theming',
        items: [
          { text: 'StyledMode', link: '/primevue_doc/Theming/StyledMode' },
        ],
      },
      {
        text: 'Components',
        items: [
          {
            text: 'DataTable',
            items: [
              { text: 'API', link: '/primevue_doc/Components/dataTableAPI' },
            ],
          },
        ],
      },
      {
        text: 'PassThrough',
        link: '/primevue_doc/PassThrough/PassThrough',
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
    markdown: {
      lineNumbers: true,
    },
  },
})
