import {
	Facebook,
	Instagram,
	Mail,
	MapPin,
	Phone,
	Pizza,
	Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-secondary py-12">
			<div className="container mx-auto px-24">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<div className="flex items-center gap-2 mb-4">
							<Pizza className="h-6 w-6 text-primary" />
							<span className="text-xl font-bold text-primary">
								Pizza Galleria
							</span>
						</div>
						<p className="text-muted-foreground">
							Crafting delicious pizzas since 2010. <br />
							Our mission is to bring joy through every slice.
						</p>
					</div>

					<div>
						<h3 className="text-lg font-bold mb-4">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Menu
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Locations
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Promotions
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									Franchise
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-bold mb-4">Contact Us</h3>
						<ul className="space-y-2">
							<li className="flex items-center gap-2">
								<Phone className="h-4 w-4 text-primary" />
								<span className="text-muted-foreground">555-123-4567</span>
							</li>
							<li className="flex items-center gap-2">
								<Mail className="h-4 w-4 text-primary" />
								<span className="text-muted-foreground">
									info@pizzagalleria.com
								</span>
							</li>
							<li className="flex items-center gap-2">
								<MapPin className="h-4 w-4 text-primary" />
								<span className="text-muted-foreground">
									123 Pizza Street, Delhi India
								</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-bold mb-4">Follow Us</h3>
						<div className="flex gap-4">
							<Link
								href="#"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								<Facebook className="h-6 w-6" />
								<span className="sr-only">Facebook</span>
							</Link>
							<Link
								href="#"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								<Twitter className="h-6 w-6" />
								<span className="sr-only">Twitter</span>
							</Link>
							<Link
								href="#"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								<Instagram className="h-6 w-6" />
								<span className="sr-only">Instagram</span>
							</Link>
						</div>
					</div>
				</div>

				<div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
					<p>
						&copy; {new Date().getFullYear()} Pizza Galleria. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
