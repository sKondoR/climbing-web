import { Button, Modal } from 'flowbite-react'

export type Props = {
    open: boolean;
    title: string;
    onConfirm: () => void;
    onDecline: () => void;
  };

const ConfirmModal = ({ open, title, onConfirm, onDecline }: Props) => {
  const handleConfirm = () => {
    if (onConfirm) onConfirm()
  }

  const handleDecline = () => {
    if (onDecline) onDecline()
  }

  return (
    <>
      <Modal
        show={open}
        position="center"
        onClose={handleDecline}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Footer>
          <Button onClick={handleConfirm}>Подтвердить</Button>
          <Button color="gray" onClick={handleDecline}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal
