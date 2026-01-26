import React, {type ReactNode} from "react";
import clsx from "clsx";
import {ThemeClassNames} from "@docusaurus/theme-common";
import {useDoc} from "@docusaurus/plugin-content-docs/client";
import Heading from "@theme/Heading";
import MDXContent from "@theme/MDXContent";
import type {Props} from "@theme/DocItem/Content";
import styles from "./styles.module.css";

export default function DocItemContent({children}: Props): ReactNode {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const description = frontMatter.description;
  const showTitle = !frontMatter.hide_title;
  const hasContentTitle = typeof contentTitle !== "undefined";
  const showSubtitle = showTitle && Boolean(description);
  const showSyntheticTitle = showTitle && !showSubtitle && !hasContentTitle;
  const hideContentTitle = showSubtitle && hasContentTitle;

  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docMarkdown,
        "markdown",
        hideContentTitle && styles.hasContentTitle,
      )}
    >
      {showSubtitle && (
        <header className={styles.header}>
          <Heading as="h1">{metadata.title}</Heading>
          <p className={styles.subtitle}>{description}</p>
        </header>
      )}
      {showSyntheticTitle && (
        <header>
          <Heading as="h1">{metadata.title}</Heading>
        </header>
      )}
      <div className={styles.content}>
        <MDXContent>{children}</MDXContent>
      </div>
    </div>
  );
}
