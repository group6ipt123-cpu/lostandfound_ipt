import React, { useState } from 'react';

const styles = `
  /* Overlay background */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  /* Main modal container */
  .dialog-modal {
    background: #ffffff;
    width: 420px;
    max-width: 90%;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    animation: fadeIn 0.25s ease;
  }

  /* Header */
  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .dialog-header h2 {
    font-size: 20px;
    font-weight: 600;
  }

  /* Close button */
  .modal-close {
    background: none;
    border: none;
    font-size: 22px;
    cursor: pointer;
  }

  /* Content */
  .dialog-body {
    margin-bottom: 20px;
  }

  .dialog-body p {
    font-size: 14px;
    color: #444;
  }

  /* Input fields */
  .dialog-body input,
  .dialog-body textarea,
  .dialog-body select {
    width: 100%;
    padding: 10px;
    margin-top: 8px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
  }

  /* Buttons */
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  .btn-cancel {
    background: #eee;
    border: none;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;
  }

  .btn-cancel:hover { background: #e0e0e0; }

  .btn-submit {
    background: #0B3A66;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;
  }

  .btn-submit:hover { background: #092c4d; }

  .btn-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Animation */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Claim Section */
  .chat-claim-section {
    padding: 16px 20px;
    background: #FFF9E6;
    border-top: 1px solid #E8DFD0;
  }

  .chat-claim-btn {
    width: 100%;
    padding: 12px;
    background: #2ECC71;
    color: #FFFFFF;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .chat-claim-btn:hover:not(:disabled) {
    background: #27AE60;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
  }

  .chat-claim-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .chat-claim-note {
    font-size: 11px;
    color: #8E8068;
    margin-top: 10px;
    text-align: center;
    line-height: 1.4;
  }

  .chat-claimed-badge {
    padding: 16px 20px;
    background: #E8F5E9;
    border-top: 1px solid #C8E6C9;
    text-align: center;
  }

  .chat-claimed-badge span {
    font-size: 13px;
    color: #2ECC71;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .chat-claimed-badge span::before {
    content: '✓';
    font-size: 16px;
    font-weight: bold;
  }

  /* Chat Action Buttons */
  .chat-action-buttons {
    padding: 16px 20px;
    border-top: 1px solid #E8DFD0;
    background: #FFFFFF;
  }

  .chat-claim-request-btn {
    width: 100%;
    padding: 12px;
    background: #F4B400;
    color: #0B3A66;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .chat-claim-request-btn:hover:not(:disabled) {
    background: #E5A800;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(244, 180, 0, 0.3);
  }

  .chat-claim-request-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .chat-resolve-btn {
    width: 100%;
    padding: 12px;
    background: #2ECC71;
    color: #FFFFFF;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .chat-resolve-btn:hover:not(:disabled) {
    background: #27AE60;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
  }

  .chat-resolve-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .claim-request-sent {
    width: 100%;
    padding: 12px;
    background: #E8F5E9;
    border-radius: 12px;
    text-align: center;
  }

  .claim-request-sent span { font-size: 13px; color: #2ECC71; font-weight: 600; }

  .chat-resolved-badge {
    width: 100%;
    padding: 12px;
    background: #E8DFD0;
    border-radius: 12px;
    text-align: center;
  }

  .chat-resolved-badge span { font-size: 13px; color: #8E8068; font-weight: 600; }

  /* Item Status Badge */
  .chat-item-status {
    padding: 12px 20px;
    background: #FAF8F4;
    border-bottom: 1px solid #E8DFD0;
    text-align: center;
  }

  .status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }

  .status-badge.pending { background: #FEF3C7; color: #B45309; }
  .status-badge.claimed { background: #D1FAE5; color: #065F46; }

  /* Claim Request Bubble */
  .claim-request-bubble {
    background: #FFF9E6 !important;
    border: 1px solid #F4B400 !important;
  }

  .claim-request-bubble .message-text { color: #B45309; }
  .other-bubble.claim-request-bubble  { background: #FFF9E6 !important; }
`;

/**
 * ConfirmDialog
 *
 * Props:
 *   isOpen      {boolean}   - controls visibility
 *   onClose     {function}  - called when cancelled or closed
 *   onConfirm   {function}  - called with optional input value when submitted
 *   title       {string}    - modal heading
 *   message     {string}    - body text
 *   confirmText {string}    - submit button label (default: "Confirm")
 *   cancelText  {string}    - cancel button label  (default: "Cancel")
 *   inputLabel  {string}    - if provided, shows a text input with this label
 *   inputPlaceholder {string}
 *   variant     {string}    - "default" | "claim" | "resolve"
 *                             "claim"   → yellow claim-request style
 *                             "resolve" → green resolve style
 */
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm',
  message = 'Are you sure?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  inputLabel = '',
  inputPlaceholder = '',
  variant = 'default',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm?.(inputValue);
    setLoading(false);
    setInputValue('');
    onClose?.();
  };

  const handleClose = () => {
    setInputValue('');
    onClose?.();
  };

  const submitClass =
    variant === 'claim'   ? 'chat-claim-request-btn' :
    variant === 'resolve' ? 'chat-resolve-btn'        :
    'btn-submit';

  return (
    <>
      <style>{styles}</style>
      <div className="modal-overlay" onClick={handleClose}>
        <div className="dialog-modal" onClick={(e) => e.stopPropagation()}>

          <div className="dialog-header">
            <h2>{title}</h2>
            <button className="modal-close" onClick={handleClose}>✕</button>
          </div>

          <div className="dialog-body">
            {message && <p>{message}</p>}
            {inputLabel && (
              <>
                <p style={{ marginTop: 12 }}>{inputLabel}</p>
                <input
                  type="text"
                  placeholder={inputPlaceholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </>
            )}
          </div>

          <div className="dialog-footer">
            <button className="btn-cancel" onClick={handleClose}>
              {cancelText}
            </button>
            <button
              className={submitClass}
              onClick={handleConfirm}
              disabled={loading || (inputLabel && !inputValue.trim())}
              style={{ width: 'auto', transform: 'none', boxShadow: 'none' }}
            >
              {loading ? 'Please wait…' : confirmText}
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ConfirmDialog;
