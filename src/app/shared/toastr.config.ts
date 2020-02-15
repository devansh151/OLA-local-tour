import { ToastOptions } from 'ng2-toastr';

export class CustomOption extends ToastOptions {
	positionClass = 'toast-bottom-center';
	showCloseButton = true;
}