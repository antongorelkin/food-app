import React from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
	isOpen: boolean;
	title: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export default function ConfirmModal({
	isOpen,
	title,
	message,
	onConfirm,
	onCancel,
}: ConfirmModalProps) {
	if (!isOpen) return null;

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onCancel();
		}
	};

	return (
		<div
			onClick={handleOverlayClick}
			className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in">
			<div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 w-full max-w-md mx-4 relative">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0">
						<AlertTriangle className="w-5 h-5" />
					</div>
					<div className="flex flex-col gap-1">
						<h4 className="text-base font-bold text-slate-800">{title}</h4>
						<p className=" text-sm leading-normal text-slate-600">{message}</p>
					</div>
				</div>
				<div className="flex gap-2.5 mt-2 justify-end">
					<button
						onClick={onCancel}
						className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-sm transition-colors cursor-pointer">
						Отмена
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl text-sm transition-colors cursor-pointer shadow-xs">
						Да, удалить
					</button>
				</div>
			</div>
		</div>
	);
}
