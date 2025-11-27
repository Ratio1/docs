import React from "react";

const envHost =
	(typeof process !== "undefined" && process.env
		? process.env.EE_HOST_ID
		: undefined) ?? "local";

export default function ServedBy(): JSX.Element {
	return (
		<div className="footer__served-by">
			<span className="footer__served-by-label">
				Ratio1 Edge node serving:
			</span>
			<span className="footer__served-by-id">{envHost}</span>
		</div>
	);
}
