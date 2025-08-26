"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import type React from "react";

type QtyChangerProps = {
	handleQtyChange: (q: number) => void;
	children: React.ReactNode;
};

const QtyChanger = ({ handleQtyChange, children }: QtyChangerProps) => {
	return (
		<div className="flex items-center gap-2">
			<Button variant="outline" size="icon" onClick={() => handleQtyChange(-1)}>
				<Minus size={16} />
			</Button>
			<div>{children}</div>
			<Button variant="outline" size="icon" onClick={() => handleQtyChange(1)}>
				<Plus size={16} />
			</Button>
		</div>
	);
};

export default QtyChanger;
