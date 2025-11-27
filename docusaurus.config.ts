import { themes as prismThemes } from "prism-react-renderer";
import { execSync } from "child_process";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const buildHashFromEnv =
	process.env.DANGEROUSLY_EXPOSE_TO_CLIENT_BUILD_HASH ??
	process.env.DANGEROUSLY_EXPOSE_TO_CLIENT_VERSION ??
	process.env.BUILD_HASH ??
	process.env.VERSION ??
	process.env.VERCEL_GIT_COMMIT_SHA ??
	process.env.VERCEL_GIT_COMMIT_SHA_SHORT ??
	process.env.NETLIFY_COMMIT_REF ??
	process.env.CF_PAGES_COMMIT_SHA ??
	process.env.GITHUB_SHA ??
	process.env.CI_COMMIT_SHA ??
	process.env.CIRCLE_SHA1;

const looksLikePlaceholder = (value?: string) =>
	!!value &&
	(value.includes("$(") ||
		value.includes("${") ||
		value.trim().startsWith("$") ||
		value.trim().startsWith(".$("));

const resolvedBuildHash = (() => {
	if (buildHashFromEnv && !looksLikePlaceholder(buildHashFromEnv)) {
		return buildHashFromEnv;
	}
	try {
		return execSync("git rev-parse --short HEAD").toString().trim();
	} catch {
		return "local";
	}
})();

const config: Config = {
  title: "Ratio1 - Docs",
  tagline: "Documentation and guides for the Ratio1 network",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://docs.ratio1.ai",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Ratio1", // Usually your GitHub org/user name.
  projectName: "Ratio1 Docs", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  customFields: {
    eeHostId:
      process.env.DANGEROUSLY_EXPOSE_TO_CLIENT_EE_HOST_ID ??
      process.env.EE_HOST_ID ??
      "local",
    buildHash: resolvedBuildHash,
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/Ratio1/docs",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        docsRouteBasePath: "/",
        language: ["en"],
        highlightSearchTermsOnTargetPage: false,
        explicitSearchResultPath: true,
        searchBarShortcut: false,
        searchBarShortcutHint: false,
      },
    ],
  ],

  themeConfig: {
    // Social card for link previews
    image: "img/Ratio1Docs.png",
    metadata: [
      {
        name: "description",
        content:
          "Ratio1 Docs is your guide to building on the Ratio1 Protocol and AI OS—covering CSP onboarding, node operations, and developer integrations to unlock decentralized AI and edge compute.",
      },
      {
        name: "keywords",
        content:
          "ratio1, decentralized compute, edge network, documentation, node operator, cloud service provider, developer docs",
      },
      { property: "og:title", content: "Ratio1 - Docs" },
      {
        property: "og:description",
        content:
          "Ratio1 Docs is your guide to building on the Ratio1 Protocol and AI OS—covering CSP onboarding, node operations, and developer integrations to unlock decentralized AI and edge compute.",
      },
      { name: "twitter:title", content: "Ratio1 - Docs" },
      {
        name: "twitter:description",
        content:
          "Ratio1 Docs is your guide to building on the Ratio1 Protocol and AI OS—covering CSP onboarding, node operations, and developer integrations to unlock decentralized AI and edge compute.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@ratio1ai" },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: "Ratio1Docs Logo",
        src: "img/Ratio1Docs.svg",
        srcDark: "img/Ratio1DocsLight.svg",
      },
      items: [
        {
          href: "https://discord.gg/ratio1ai",
          position: "right",
          className: "navbar__icon-button navbar__discord-button",
          "aria-label": "Discord",
          html: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 245 240" fill="currentColor" aria-hidden="true" focusable="false"><path d="M104.4 104.5c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zm36.2 0c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"/><path d="M189.5 20h-134C44.4 20 36 28.4 36 38.6v134.1c0 10.2 8.4 18.6 19.5 18.6h113.1l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V38.6c0-10.2-8.4-18.6-19.5-18.6zm-38.6 130s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.4-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.8c10.7-4.7 19.1-6 22.6-6.4.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0-.1-8.4 14.4-30.6 15.1z"/></svg>`,
        },
        {
          href: "https://t.me/ratio1",
          position: "right",
          className: "navbar__icon-button navbar__telegram-button",
          "aria-label": "Telegram",
          html: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M21.5 3.1c-.3-.2-.7-.2-1.1-.1L2.9 10c-.4.1-.8.5-.8.9 0 .4.3.8.7.9l4.6 1.4 1.7 5.2c.1.4.5.7.9.7h.1c.4 0 .8-.3.9-.7l1.5-4.4 5.2 3.9c.2.2.4.2.6.2.2 0 .4 0 .5-.1.3-.1.6-.4.6-.8l1.8-14c0-.4-.1-.8-.4-.9zM18 17l-4.8-3.5c-.2-.2-.5-.2-.8-.2-.4.1-.7.3-.8.7l-1.2 3.5-1.2-3.7 7.7-5.6c.3-.2.4-.6.2-.9-.2-.3-.6-.5-.9-.3L6 11.5l-3.5-1L20 5.5 18 17z"/></svg>`,
        },
        {
          href: "https://github.com/Ratio1",
          position: "right",
          className: "navbar__icon-button navbar__github-button",
          "aria-label": "GitHub",
          html: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 .5C5.648.5.5 5.806.5 12.326c0 5.225 3.438 9.651 8.207 11.214.6.114.82-.27.82-.6 0-.29-.011-1.06-.017-2.082-3.338.75-4.042-1.654-4.042-1.654-.545-1.426-1.332-1.806-1.332-1.806-1.087-.772.083-.756.083-.756 1.203.087 1.837 1.277 1.837 1.277 1.068 1.9 2.804 1.351 3.49 1.034.108-.795.418-1.351.761-1.662-2.665-.314-5.467-1.378-5.467-6.137 0-1.357.46-2.465 1.215-3.333-.122-.316-.526-1.58.115-3.293 0 0 1.004-.333 3.292 1.273a11.25 11.25 0 0 1 5.992 0c2.287-1.606 3.29-1.273 3.29-1.273.642 1.713.238 2.977.117 3.293.757.868 1.214 1.976 1.214 3.333 0 4.77-2.807 5.819-5.48 6.125.43.383.814 1.138.814 2.294 0 1.655-.015 2.992-.015 3.4 0 .333.216.72.826.598C20.066 21.974 23.5 17.55 23.5 12.326 23.5 5.806 18.353.5 12 .5Z\"/></svg>`,
        },
      ],
    },
    footer: {
      style: "dark",
      logo: {
        alt: "Ratio1Docs Logo",
        src: "img/Ratio1DocsLight.svg",
        width: 120,
      },
      links: [
        {
          title: "Socials",
          items: [
            {
              label: "X",
              href: "https://x.com/ratio1ai",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/ratio1",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Telegram",
              href: "https://t.me/Ratio1Protocol",
            },
            {
              label: "Discord",
              href: "https://discord.gg/ratio1ai",
            },
          ],
        },
        {
          title: "Useful Links",
          items: [
            {
              label: "Website",
              href: "https://ratio1.ai",
            },
            {
              label: "CSP dApp",
              href: "https://deeploy.ratio1.ai",
            },
            {
              label: "Node Operator dApp",
              href: "https://app.ratio1.ai",
            },
            {
              label: "Explorer",
              href: "https://explorer.ratio1.ai",
            },
          ],
        },
      ],
      copyright:
        '© 2025 Ratio1. Built with <a href="https://docusaurus.io" target="_blank" rel="noopener noreferrer">Docusaurus</a>, deployed on <a href="https://ratio1.ai" target="_blank" rel="noopener noreferrer">Ratio1</a>.',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
