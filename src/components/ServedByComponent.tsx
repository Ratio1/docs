import React from "react";

export default function ServedBy(): JSX.Element {
	const envHost = process.env.EE_HOST_ID ?? "local";

	return (
		<div className="footer__served-by">
			<span className="footer__served-by-label">
				Ratio1 Edge node serving:
			</span>
			<span className="footer__served-by-id">{envHost}</span>
		</div>
	);
}
