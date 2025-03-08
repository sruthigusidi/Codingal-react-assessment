import React, { useState } from 'react';

interface EndClassModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const EndClassModal: React.FC<EndClassModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const [mainReason, setMainReason] = useState<'completed' | 'interrupted'>(
    'completed'
  );

  const [subReason, setSubReason] = useState<string>('');

  const [otherReasonText, setOtherReasonText] = useState<string>('');
  if (!isOpen) return null;

  const subReasons = [
    "Student didn't show up for the class",
    "Student didn't show any interest",
    'Student got disconnected',
    'I got disconnected',
    'Other reason',
  ];

  const handleMainReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as 'completed' | 'interrupted';
    setMainReason(value);

    if (value === 'completed') {
      setSubReason('');
      setOtherReasonText('');
    }
  };

  const handleSubReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSubReason(value);
    if (value !== 'Other reason') {
      setOtherReasonText('');
    }
  };

  const handleOtherReasonTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setOtherReasonText(event.target.value);
  };

  const handleEndClass = () => {
    onConfirm();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onCancel}>
          &times;
        </button>

        <h2>Select a reason to end class</h2>

        <div className="modal-main-reasons">
          <label className="radio-label main-option">
            <input
              type="radio"
              name="mainReason"
              value="completed"
              checked={mainReason === 'completed'}
              onChange={handleMainReasonChange}
            />
            Class completed
          </label>

          <label className="radio-label main-option">
            <input
              type="radio"
              name="mainReason"
              value="interrupted"
              checked={mainReason === 'interrupted'}
              onChange={handleMainReasonChange}
            />
            Class interrupted/aborted
          </label>
        </div>

        <div
          className={`additional-options ${
            mainReason === 'interrupted' ? 'show' : ''
          }`}
        >
          {subReasons.map((reason) => (
            <label key={reason} className="radio-label sub-option">
              <input
                type="radio"
                name="subReason"
                value={reason}
                checked={subReason === reason}
                onChange={handleSubReasonChange}
              />
              {reason}
            </label>
          ))}

          <div
            className={`other-reason-container ${
              subReason === 'Other reason' ? 'show' : ''
            }`}
          >
            <textarea
              placeholder="Type here"
              value={otherReasonText}
              onChange={handleOtherReasonTextChange}
            />
          </div>
        </div>

        <div className="modal-buttons">
          <button onClick={handleEndClass} className="modal-end-btn">
            End Class
          </button>
          <button onClick={onCancel} className="modal-cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndClassModal;
