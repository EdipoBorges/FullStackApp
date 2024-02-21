import Modal from 'react-modal';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';

import { OrderItemProps } from '@/pages/dashboard';

interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    order: OrderItemProps;
}

export function ModalOrder({ isOpen, onRequestClose, order }: ModalOrderProps) {


    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1e1e3e',
        }
    };

    return (

        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >

            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
                style={{ background: 'transparent', border: 0 }}
            >
                <FiX size={45} color="#d03535" />
            </button>

        </Modal>
    )
}
