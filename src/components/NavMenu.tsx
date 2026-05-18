import { Refrigerator, Sparkles, ShoppingBag } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

interface MenuItem {
	id: "fridge" | "chef" | "shop";
	label: string;
	icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
}

interface SidebarProps {
	activeTab: "fridge" | "chef" | "shop";
	setActiveTab: (tab: "fridge" | "chef" | "shop") => void;
	session: any;
	size?: number;
}

const menuItems: MenuItem[] = [
	{ id: "fridge", label: "Мой холодильник", icon: Refrigerator },
	{ id: "chef", label: "ИИ-шеф", icon: Sparkles },
	{ id: "shop", label: "Список покупок", icon: ShoppingBag },
];

export default function NavMenu({
	activeTab,
	setActiveTab,
	session,
	size = 20,
}: SidebarProps) {
	return (
		<nav className="flex flex-col gap-1.5 flex-1 mt-8">
			{menuItems.map((item) => {
				const isActive = activeTab === item.id;
				const Icon = item.icon;
				return (
					<button
						key={item.id}
						onClick={() => setActiveTab(item.id)}
						className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 
              ${
								isActive
									? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
									: "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
							}`}>
						<Icon size={size} />
						<span>{item.label}</span>
					</button>
				);
			})}
		</nav>
	);
}
