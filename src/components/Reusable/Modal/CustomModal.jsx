import { Modal } from "antd";

const CustomModal = ({ setOpen, open, children, title, loading }) => {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title={title}
      width={1000}
      destroyOnClose
      centered
      footer={null}
      loading={loading}
      keyboard={true}
    >
      <div className="lg:p-5">{children}</div>
    </Modal>
  );
};

export default CustomModal;
