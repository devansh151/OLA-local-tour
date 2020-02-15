import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { RoleMatrixService } from './../../core/services/role-matrix.service';
import { ACCESS_LEVELS } from './../globals.constants';

@Directive({
	selector: '[odRoleMatrix]'
})
export class RoleMatrixDirective {

	@Input() disabledClassName;
	@Input() odRoleMatrix: Array<string>;
	@Input() odUserRole: string;

	constructor(private el: ElementRef, private roleMatrixService: RoleMatrixService) {

	}

	ngAfterViewInit() {
		let userRole = this.odUserRole;
		if (!this.odRoleMatrix)
			return;

		if (!userRole) {
			userRole = this.roleMatrixService.determineRoleType();
		}

		let path = this.odRoleMatrix.concat([userRole]);
		let accessLevel = this.roleMatrixService.getAccessLevel(path);

		if (accessLevel) {
			if (accessLevel !== ACCESS_LEVELS['CAN_EDIT']) {
				(accessLevel === ACCESS_LEVELS['VIEW_ONLY']) ? this.setReadAccessStyle() : this.setNoAccessStyle();
			}
		}
	}
	setReadAccessStyle() {
		this.el.nativeElement.classList.add(this.disabledClassName || 'ola-action-disabled');
	}

	setNoAccessStyle() {
		let elem = this.el.nativeElement;
		elem.parentNode.removeChild(elem);
	}

}
