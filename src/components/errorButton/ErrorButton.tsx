interface ErrorButtonProps {
  triggerError: () => void;
}

export const ErrorButton = ({ triggerError }: ErrorButtonProps) => {
  return (
    <div className="error-button-wrapper">
      <button className="error-button" onClick={triggerError}>
        Throw Error
      </button>
    </div>
  );
};
