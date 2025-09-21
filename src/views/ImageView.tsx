import React, { useEffect, useRef } from "react";
import FocusTrap from "focus-trap-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchCatById } from "../services/cats";
import Skeleton from "../components/atoms/Skeleton";
import { CatImage } from "../api/types"; // Assuming Cat is CatImage

const CatModal: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location } | undefined;
	const { id } = useParams<{ id: string }>();
	const closeTo = state?.backgroundLocation ? -1 : "/"; // fallback

	const handleCloseModal = () => {
		if (typeof closeTo === 'number') {
			navigate(closeTo);
		} else {
			navigate(closeTo);
		}
	};

	const [cat, setCat] = React.useState<CatImage | null>(null);
	const [loading, setLoading] = React.useState<boolean>(true);
	const [error, setError] = React.useState<string | null>(null);

	useEffect(() => {
		let mounted = true;
		setLoading(true);
		fetchCatById(id!)
			.then((res) => mounted && setCat(res))
			.catch((e) => mounted && setError((e as Error).message))
			.finally(() => mounted && setLoading(false));
		return () => { mounted = false; };
	}, [id]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleCloseModal(); };
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [handleCloseModal]);

	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	useEffect(() => { closeBtnRef.current?.focus(); }, []);

	const content = loading ? (
		<div>
			<Skeleton height="400px" className="mb-4 rounded" />
			<Skeleton width="60%" />
			<Skeleton width="90%" />
		</div>
	) : error ? (
		<div role="alert">Failed to load: {error}</div>
	) : (
		<div>
			<img src={cat?.url} alt={cat?.breeds?.[0]?.name ?? `Cat ${cat?.id}`} />
			{/* details */}
		</div>
	);

	const isOverlay = !!state?.backgroundLocation;
	const modalInner = (
		<div className="relative bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
			<button ref={closeBtnRef} aria-label="Close" onClick={handleCloseModal} className="absolute right-2 top-2">✕</button>
			{content}
		</div>
	);

	return isOverlay ? (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/50" onClick={handleCloseModal} data-testid="modal-backdrop" />
			<FocusTrap>{modalInner}</FocusTrap>
		</div>
	) : (
		<div className="p-6">{modalInner}</div>
	);
};

export default CatModal;
