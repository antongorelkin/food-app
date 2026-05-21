import React from "react";

export default function RecipeSkeleton() {
	return (
		<div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col gap-4 animate-pulse">
			<div className="h-6 bg-slate-200 rounded-lg w-2/3"></div>
			<div className="h-4 bg-slate-200 rounded-lg w-1/4"></div>
			<div className="space-y-2 mt-4">
				<div className="h-4 bg-slate-200 rounded-lg w-full"></div>
				<div className="h-4 bg-slate-200 rounded-lg w-5/6"></div>
				<div className="h-4 bg-slate-200 rounded-lg w-4/5"></div>
			</div>
		</div>
	);
}
