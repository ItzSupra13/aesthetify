'use client';

import { parseThemeColors, ThemeType } from '@/lib/constants';
import { useCanvas } from './canvas-context';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';

const ThemeSelector = () => {
	const { themes, theme: currentTheme, setTheme } = useCanvas();

	return (
		<div className="flex flex-col max-h-96">
			<div className="flex-1 pb-2 px-4 overflow-y-auto">
				<h3 className="font-semibold text-sm mb-2">Choose a Theme</h3>

				{themes?.map((theme) => (
					<ThemeItem
						key={theme.id}
						theme={theme}
						isSelected={currentTheme?.id === theme.id}
						onSelect={() => setTheme(theme.id)}
					/>
				))}
			</div>
		</div>
	);
};

function ThemeItem({
	theme,
	isSelected,
	onSelect,
}: {
	theme: ThemeType;
	isSelected: boolean;
	onSelect: () => void;
}) {
	const colors = parseThemeColors(theme.style);

	return (
		<Button
			onClick={onSelect}
			className={cn(
				'flex items-center justify-between w-full p-2 rounded-xl border gap-4 bg-background',
				isSelected ? 'border-2' : 'border',
			)}
			style={{
				borderColor: isSelected ? colors.primary : undefined,
			}}
		>
			<div className="flex gap-2">
				{['primary', 'secondary', 'accent', 'muted'].map((key) => (
					<div
						key={key}
						className="w-4 h-4 rounded-full border"
						style={{
							backgroundColor: colors[key],
							borderColor: '#ccc',
						}}
					/>
				))}
			</div>

			<div className="flex items-center gap-2 flex-[0.9]">
				<span className="text-sm">{theme.name}</span>
				{isSelected && <CheckIcon size={14} color={colors.primary} />}
			</div>
		</Button>
	);
}

export default ThemeSelector;
