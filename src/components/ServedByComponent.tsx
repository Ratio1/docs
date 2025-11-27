import React, { useEffect, useState } from "react";

const defaultHost =
	(typeof process !== "undefined" && process.env
		? process.env.EE_HOST_ID
		: undefined) ?? "local";

export default function ServedBy(): JSX.Element {
	const [hostId, setHostId] = useState(defaultHost);

	useEffect(() => {
		let cancelled = false;

		const fetchHost = async () => {
			if (typeof window === "undefined") return;
			try {
				const target = window.location.pathname || "/";
				const res = await fetch(target, { method: "HEAD", cache: "no-store" });
				const headerHost =
					res.headers.get("x-vercel-id") ??
					res.headers.get("x-request-id") ??
					res.headers.get("server");
				if (!cancelled && headerHost) {
					setHostId(headerHost);
				}
			} catch {
				// Ignore errors and keep the default host value
			}
		};

		void fetchHost();

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<div className="footer__served-by">
			<span className="footer__served-by-label">
				Ratio1 Edge node serving:
			</span>
			<span className="footer__served-by-id">{hostId}</span>
		</div>
	);
}
