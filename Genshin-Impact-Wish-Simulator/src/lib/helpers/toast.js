import { toastMsg } from '$lib/store/app-stores';

export const pushToast = ({
	type = 'info',
	dismissible = false,
	autoclose = true,
	timeout = 3000,
	message = ''
}) => {
	const id = Math.floor(Math.random() * 10000);
	const toastData = { id, dismissible, autoclose, timeout, type, message };

	// Push the toast to the top of the list of toasts
	toastMsg.update((all) => [toastData, ...all]);
	if (autoclose && timeout > 1) setTimeout(() => dismissToast(id), timeout);
};

export const dismissToast = (id) => {
	toastMsg.update((all) => all.filter((t) => t.id !== id));
};

