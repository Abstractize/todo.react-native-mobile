import { ComponentType } from 'react';
import { ModalEntry } from '../models/ModalEntry';
import { ModalOptions } from '../models/ModalOptions';


export class ModalService {
    private showModal: ((entry: ModalEntry) => void) | null = null;

    registerRenderer(renderer: (entry: ModalEntry) => void) {
        this.showModal = renderer;
    }

    open<T>(component: ComponentType<any>, options?: ModalOptions<T>): Promise<T> {
        return new Promise((resolve) => {
            if (!this.showModal) {
                throw new Error('Modal renderer is not registered.');
            }

            return this.showModal({ component, options, resolve });
        });
    }
}
