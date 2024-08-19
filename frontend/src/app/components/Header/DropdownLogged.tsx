'use client';

import AuthModal from '../Modals/AuthModal';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import DownloadPDFButton, { DownloadPDFButtonRef } from './DownloadPDFButton';
import LogoutButton from './LogoutButton';
import NewResumeButton, { NewResumeButtonRef } from './NewResumeButton';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { IconLocation } from '@tabler/icons-react';
import { useRef } from 'react';

type DropdownLoggedProps = {
	username: string | null;
	resumeId?: string;
};

const DropdownLogged = ({ username, resumeId }: DropdownLoggedProps) => {
	const downloadPDFButtonRef = useRef<DownloadPDFButtonRef>(null);
	const newResumeButtonRef = useRef<NewResumeButtonRef>(null);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="outline-none">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<span className="text-zinc-500 text-sm font-bold flex items-center gap-1 h-fit hover:text-zinc-800 -mt-2 duration-200 py-2 px-4 hover:bg-zinc-200/50 rounded-lg cursor-pointer">
								<IconLocation size={18} />
							</span>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							<p className="text-xs">Actions</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-20 text-zinc-700">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem onClick={() => newResumeButtonRef.current?.handleNewResume()}>
					<NewResumeButton ref={newResumeButtonRef} />
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => downloadPDFButtonRef.current?.handleDownloadPdf()}>
					<DownloadPDFButton ref={downloadPDFButtonRef} resumeId={resumeId} />
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				{username ? <LogoutButton /> : <AuthModal />}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownLogged;
