import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function ServedBy(): JSX.Element {
	const { siteConfig } = useDocusaurusContext();
	const envHost =
		(siteConfig?.customFields as { eeHostId?: string })?.eeHostId ?? "local";

	return (
		<div className="footer__served-by">
			<span className="footer__served-by-label">
				Ratio1 Edge node serving:
			</span>
			<span className="footer__served-by-id">{envHost}</span>
		</div>
	);
}
