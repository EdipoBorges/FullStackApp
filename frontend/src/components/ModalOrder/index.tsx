import Modal from 'react-modal';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';

import { OrderItemProps } from '@/pages/dashboard';

// @ts-nocheck
interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    order: OrderItemProps;
    handleFinishOrder: (id: string) => void;
}

export function ModalOrder({ isOpen, onRequestClose, order, handleFinishOrder }: ModalOrderProps) {

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1d2b2e',
        }
    };

    return (
        // @ts-ignore
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

            
            <div className={styles.container}>
                <h2>Detalhes da Reunião</h2>
                
                <span className={styles.table}> 
                    Reunião: <strong>{
                    // @ts-ignore
                    order[0].order.table}</strong>                     
                </span>

                
                {
                // @ts-ignore
                order.map(item => ( 
                    <section key={item.id} className={styles.containerItem}>
                        <span>{item.amount} - <strong>{item.product.name}</strong></span>
                        <span className={styles.description}>{item.product.description}</span>
                    </section>
                ))}                
                <button className={styles.buttonOrder} onClick={() => handleFinishOrder(
                    // @ts-ignore
                    order[0].order_id)}> 
                    Finalizar
                </button>

            </div>

        </Modal>
    )
}
