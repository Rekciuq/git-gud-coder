type ModalWindowBodyProps = {
  children: React.ReactNode;
};

const ModalWindowBody = ({ children }: ModalWindowBodyProps) => {
  return (
    <div className="text-primary-text bg-background border border-primary-text cursor-default">
      {children}
    </div>
  );
};

export default ModalWindowBody;
