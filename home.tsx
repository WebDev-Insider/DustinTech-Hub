import { Icon } from "@iconify/react";

export function Home() {
	return (
		<div className="flex flex-col h-full bg-background text-foreground font-sans">
			<header className="px-5 pt-6 pb-4 bg-background sticky top-0 z-10">
				<div className="flex items-center justify-between mb-5">
					<div className="flex items-center gap-2">
						<div className="flex items-center justify-center size-10 bg-primary rounded-xl text-primary-foreground">
							<Icon icon="solar:laptop-bold" className="size-6" />
						</div>
						<h1 className="text-xl font-bold font-heading tracking-tight">TechStore</h1>
					</div>
					<div className="relative">
						<button className="flex items-center justify-center size-10 rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors">
							<Icon icon="solar:cart-large-2-linear" className="size-6" />
						</button>
						<span className="absolute top-0 right-0 flex items-center justify-center size-4 bg-destructive text-white text-[10px] font-bold rounded-full ring-2 ring-background">
							2
						</span>
					</div>
				</div>
				<div className="relative group">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
						<Icon icon="solar:magnifer-linear" className="size-5" />
					</div>
					<input
						type="text"
						placeholder="Search laptops..."
						className="block w-full pl-10 pr-4 py-3.5 bg-secondary border-transparent text-foreground placeholder-muted-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all"
					/>
					<div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-muted-foreground hover:text-primary">
						<Icon icon="solar:filter-linear" className="size-5" />
					</div>
				</div>
			</header>
			<main className="flex-1 overflow-y-auto pb-24 no-scrollbar">
				<div className="px-5 pb-6">
					<div className="flex items-center justify-between mb-3">
						<h2 className="font-semibold text-lg font-heading">Brands</h2>
						<button className="text-sm text-primary font-medium">See All</button>
					</div>
					<div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 no-scrollbar">
						<button className="flex flex-col items-center gap-2 min-w-[72px]">
							<div className="size-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md shadow-primary/25">
								<Icon icon="solar:widget-2-bold" className="size-7" />
							</div>
							<span className="text-xs font-medium text-primary">All</span>
						</button>
						<button className="flex flex-col items-center gap-2 min-w-[72px]">
							<div className="size-16 rounded-full bg-card border border-border flex items-center justify-center text-foreground">
								<Icon icon="mdi:apple" className="size-8" />
							</div>
							<span className="text-xs font-medium text-muted-foreground">Apple</span>
						</button>
						<button className="flex flex-col items-center gap-2 min-w-[72px]">
							<div className="size-16 rounded-full bg-card border border-border flex items-center justify-center text-foreground">
								<Icon icon="mdi:dell" className="size-8" />
							</div>
							<span className="text-xs font-medium text-muted-foreground">Dell</span>
						</button>
						<button className="flex flex-col items-center gap-2 min-w-[72px]">
							<div className="size-16 rounded-full bg-card border border-border flex items-center justify-center text-foreground">
								<span className="text-xl font-extrabold italic tracking-tighter">hp</span>
							</div>
							<span className="text-xs font-medium text-muted-foreground">HP</span>
						</button>
						<button className="flex flex-col items-center gap-2 min-w-[72px]">
							<div className="size-16 rounded-full bg-card border border-border flex items-center justify-center text-foreground">
								<span className="text-xs font-bold tracking-wide rotate-[-5deg] bg-foreground text-background px-1 py-0.5">
									Lenovo
								</span>
							</div>
							<span className="text-xs font-medium text-muted-foreground">Lenovo</span>
						</button>
						<button className="flex flex-col items-center gap-2 min-w-[72px]">
							<div className="size-16 rounded-full bg-card border border-border flex items-center justify-center text-foreground">
								<span className="text-sm font-bold uppercase tracking-widest scale-x-110">
									ASUS
								</span>
							</div>
							<span className="text-xs font-medium text-muted-foreground">Asus</span>
						</button>
					</div>
				</div>
				<div className="px-5">
					<div className="flex items-center justify-between mb-4">
						<h2 className="font-semibold text-lg font-heading">Popular Laptops</h2>
						<div className="flex gap-2">
							<button className="p-1.5 rounded-lg bg-secondary text-foreground">
								<Icon icon="solar:menu-dots-bold" className="size-5" />
							</button>
							<button className="p-1.5 rounded-lg text-muted-foreground">
								<Icon icon="solar:list-linear" className="size-5" />
							</button>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="bg-card rounded-2xl p-3 shadow-sm border border-border/50 flex flex-col h-full group">
							<div className="relative bg-secondary/50 rounded-xl p-4 mb-3 aspect-[4/3] flex items-center justify-center overflow-hidden">
								<div className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full z-10">
									<Icon icon="solar:heart-linear" className="size-4 text-muted-foreground" />
								</div>
								<img
									src="https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=400&q=80"
									alt="MacBook Pro"
									className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<div className="flex flex-col flex-1">
								<p className="text-xs font-medium text-muted-foreground mb-1">Apple</p>
								<h3 className="font-bold text-sm text-foreground leading-tight mb-2 line-clamp-2">
									MacBook Pro 14" M3 Pro Chip
								</h3>
								<div className="mt-auto flex items-center justify-between">
									<span className="font-bold text-base text-primary">$1,999</span>
									<button className="size-8 flex items-center justify-center bg-foreground text-background rounded-lg hover:bg-primary transition-colors">
										<Icon icon="solar:add-square-bold" className="size-5" />
									</button>
								</div>
							</div>
						</div>
						<div className="bg-card rounded-2xl p-3 shadow-sm border border-border/50 flex flex-col h-full group">
							<div className="relative bg-secondary/50 rounded-xl p-4 mb-3 aspect-[4/3] flex items-center justify-center overflow-hidden">
								<div className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full z-10">
									<Icon icon="solar:heart-linear" className="size-4 text-muted-foreground" />
								</div>
								<img
									src="https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=400&q=80"
									alt="Dell XPS 15"
									className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<div className="flex flex-col flex-1">
								<p className="text-xs font-medium text-muted-foreground mb-1">Dell</p>
								<h3 className="font-bold text-sm text-foreground leading-tight mb-2 line-clamp-2">
									Dell XPS 15 OLED Touch
								</h3>
								<div className="mt-auto flex items-center justify-between">
									<span className="font-bold text-base text-primary">$1,499</span>
									<button className="size-8 flex items-center justify-center bg-secondary text-foreground rounded-lg hover:bg-primary hover:text-white transition-colors">
										<Icon icon="solar:add-square-bold" className="size-5" />
									</button>
								</div>
							</div>
						</div>
						<div className="bg-card rounded-2xl p-3 shadow-sm border border-border/50 flex flex-col h-full group">
							<div className="relative bg-secondary/50 rounded-xl p-4 mb-3 aspect-[4/3] flex items-center justify-center overflow-hidden">
								<div className="absolute top-0 left-0 bg-destructive text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10">
									SALE
								</div>
								<div className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full z-10">
									<Icon icon="solar:heart-bold" className="size-4 text-destructive" />
								</div>
								<img
									src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80"
									alt="Asus ROG"
									className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<div className="flex flex-col flex-1">
								<p className="text-xs font-medium text-muted-foreground mb-1">Asus</p>
								<h3 className="font-bold text-sm text-foreground leading-tight mb-2 line-clamp-2">
									ROG Zephyrus G14 Gaming
								</h3>
								<div className="mt-auto flex items-center justify-between">
									<div className="flex flex-col">
										<span className="font-bold text-base text-primary">$1,299</span>
										<span className="text-[10px] text-muted-foreground line-through">$1,599</span>
									</div>
									<button className="size-8 flex items-center justify-center bg-secondary text-foreground rounded-lg hover:bg-primary hover:text-white transition-colors">
										<Icon icon="solar:add-square-bold" className="size-5" />
									</button>
								</div>
							</div>
						</div>
						<div className="bg-card rounded-2xl p-3 shadow-sm border border-border/50 flex flex-col h-full group">
							<div className="relative bg-secondary/50 rounded-xl p-4 mb-3 aspect-[4/3] flex items-center justify-center overflow-hidden">
								<div className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full z-10">
									<Icon icon="solar:heart-linear" className="size-4 text-muted-foreground" />
								</div>
								<img
									src="https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=400&q=80"
									alt="Microsoft Surface"
									className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<div className="flex flex-col flex-1">
								<p className="text-xs font-medium text-muted-foreground mb-1">Microsoft</p>
								<h3 className="font-bold text-sm text-foreground leading-tight mb-2 line-clamp-2">
									Surface Laptop 5 13.5"
								</h3>
								<div className="mt-auto flex items-center justify-between">
									<span className="font-bold text-base text-primary">$999</span>
									<button className="size-8 flex items-center justify-center bg-secondary text-foreground rounded-lg hover:bg-primary hover:text-white transition-colors">
										<Icon icon="solar:add-square-bold" className="size-5" />
									</button>
								</div>
							</div>
						</div>
						<div className="bg-card rounded-2xl p-3 shadow-sm border border-border/50 flex flex-col h-full group">
							<div className="relative bg-secondary/50 rounded-xl p-4 mb-3 aspect-[4/3] flex items-center justify-center overflow-hidden">
								<div className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full z-10">
									<Icon icon="solar:heart-linear" className="size-4 text-muted-foreground" />
								</div>
								<img
									src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80"
									alt="HP Spectre"
									className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<div className="flex flex-col flex-1">
								<p className="text-xs font-medium text-muted-foreground mb-1">HP</p>
								<h3 className="font-bold text-sm text-foreground leading-tight mb-2 line-clamp-2">
									HP Spectre x360 2-in-1
								</h3>
								<div className="mt-auto flex items-center justify-between">
									<span className="font-bold text-base text-primary">$1,349</span>
									<button className="size-8 flex items-center justify-center bg-secondary text-foreground rounded-lg hover:bg-primary hover:text-white transition-colors">
										<Icon icon="solar:add-square-bold" className="size-5" />
									</button>
								</div>
							</div>
						</div>
						<div className="bg-card rounded-2xl p-3 shadow-sm border border-border/50 flex flex-col h-full group">
							<div className="relative bg-secondary/50 rounded-xl p-4 mb-3 aspect-[4/3] flex items-center justify-center overflow-hidden">
								<div className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full z-10">
									<Icon icon="solar:heart-linear" className="size-4 text-muted-foreground" />
								</div>
								<img
									src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80"
									alt="Acer Swift"
									className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<div className="flex flex-col flex-1">
								<p className="text-xs font-medium text-muted-foreground mb-1">Acer</p>
								<h3 className="font-bold text-sm text-foreground leading-tight mb-2 line-clamp-2">
									Acer Swift Go 14 OLED
								</h3>
								<div className="mt-auto flex items-center justify-between">
									<span className="font-bold text-base text-primary">$799</span>
									<button className="size-8 flex items-center justify-center bg-secondary text-foreground rounded-lg hover:bg-primary hover:text-white transition-colors">
										<Icon icon="solar:add-square-bold" className="size-5" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			<nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border pb-safe pt-2 px-2 z-50">
				<div className="flex justify-around items-center h-16">
					<button className="flex flex-col items-center justify-center w-full h-full gap-1 text-primary">
						<Icon icon="solar:home-2-bold" className="size-6" />
						<span className="text-[10px] font-semibold">Home</span>
					</button>
					<button className="flex flex-col items-center justify-center w-full h-full gap-1 text-muted-foreground hover:text-foreground transition-colors">
						<Icon icon="solar:widget-2-linear" className="size-6" />
						<span className="text-[10px] font-medium">Categories</span>
					</button>
					<button className="flex flex-col items-center justify-center w-full h-full gap-1 text-muted-foreground hover:text-foreground transition-colors relative">
						<div className="relative">
							<Icon icon="solar:cart-large-2-linear" className="size-6" />
							<span className="absolute -top-1 -right-1 size-3 bg-destructive rounded-full border border-card" />
						</div>
						<span className="text-[10px] font-medium">Cart</span>
					</button>
					<button className="flex flex-col items-center justify-center w-full h-full gap-1 text-muted-foreground hover:text-foreground transition-colors">
						<Icon icon="solar:user-circle-linear" className="size-6" />
						<span className="text-[10px] font-medium">Profile</span>
					</button>
				</div>
			</nav>
		</div>
	);
}
