import { Modal as AntdModal, ModalProps } from "antd";

const Modal: React.FC<ModalProps> = ({ className, ...props }) => {
    return <AntdModal {...props} centered className={className} />;
};
export const useModal = AntdModal.useModal;
export default Modal;
