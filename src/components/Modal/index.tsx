import { Modal as AntdModal, ModalProps } from "antd";

const Modal: React.FC<ModalProps> = ({ className, ...props }) => {
    return <AntdModal {...props} className={className} />;
};
export const useModal = AntdModal.useModal;
export default Modal;
