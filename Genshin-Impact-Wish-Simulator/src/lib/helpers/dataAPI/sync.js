import { renewSavedFile } from './api-filesystem';

export const updateRemoteStorage = ({ to } = {}) => {
	if (to === 'local') return renewSavedFile();
	if (to == 'drive') return; //updateDrive()
};

const localCooldown = 2500;
const driveCooldown = 30000;
let inSyncLocal = false;
let inSyncDrive = false;

const localSyncTimeout = async () => {
	if (inSyncLocal) return;
	inSyncLocal = true;
	await updateRemoteStorage({ to: 'local' });

	// Start cooldown
	const timeout = setTimeout(() => {
		inSyncLocal = false;
		clearTimeout(timeout);
	}, localCooldown);
};

const driveSyncTimeout = async () => {
	//
};

export const sync = (autoExport) => {
	driveSyncTimeout();

	if (!autoExport) return;
	localSyncTimeout();
};

