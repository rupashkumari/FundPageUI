import React, { useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import { UpiLogo, NetBankingLogo, BankLogo } from './PaymentIcons';

export default function AddFundsModal({
  amount,
  setAmount,
  selectedMode,
  setSelectedMode,
  availableBalance = 0,
  onGenerateQR,
  onClose
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const quickAmounts = [1000, 5000, 10000];

  const handleQuickAdd = (addValue) => {
    setErrorMessage('');
    const current = parseFloat(amount) || 0;
    setAmount((current + addValue).toString());
  };

  const handleInputChange = (e) => {
    let val = e.target.value;
    setErrorMessage('');

    // If starting with 0 followed by digits, strip the leading 0 (e.g., "0100" -> "100")
    if (/^0[0-9]/.test(val)) {
      val = val.replace(/^0+/, '');
    }

    // Allow only valid numbers (integers or up to 2 decimal places)
    if (val === '' || /^\d*(\.\d{0,2})?$/.test(val)) {
      setAmount(val);
    }
  };

  const handleInputFocus = () => {
    if (amount === '0') {
      setAmount('');
    }
  };

  const handleProceed = () => {
    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      setErrorMessage('Please enter a valid amount to proceed.');
      return;
    }
    setErrorMessage('');
    onGenerateQR();
  };

  const paymentModes = [
    {
      id: 'upi_qr',
      title: 'UPI QR',
      icon: <UpiLogo />,
      hasCheckbox: true,
    },
    {
      id: 'upi_id',
      title: 'UPI ID',
      icon: <UpiLogo />,
      hasCheckbox: true,
    },
    {
      id: 'net_banking',
      title: 'Net Banking',
      icon: <NetBankingLogo />,
      hasCheckbox: true,
    },
    {
      id: 'imps_neft',
      title: 'IMPS / NEFT / RTGS',
      icon: <BankLogo />,
      hasCheckbox: true,
    },
  ];

  return (
    <div className="modal-card add-funds-card">
      {/* Header */}
      <div className="card-header">
        <h2 className="card-title">Add Funds</h2>
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} strokeWidth={2.2} />
        </button>
      </div>

      {/* Available Balance */}
      <div className="balance-row">
        <span className="balance-label">Available Balance:</span>
        <span className="balance-value">
          ₹ {availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      {/* Popup Error Notification Toast */}
      {errorMessage && (
        <div className="popup-toast-wrapper" role="alert">
          <div className="popup-toast">
            <AlertCircle size={16} className="popup-toast-icon" />
            <span className="popup-toast-msg">{errorMessage}</span>
            <button
              type="button"
              className="popup-toast-close"
              onClick={() => setErrorMessage('')}
              aria-label="Dismiss error"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Enter Amount Section */}
      <div className="form-group">
        <label htmlFor="amount-input" className="form-label">
          Enter Amount
        </label>
        <div className={`amount-input-wrapper ${errorMessage ? 'has-error' : ''}`}>
          <span className="currency-prefix">₹</span>
          <input
            id="amount-input"
            type="text"
            inputMode="decimal"
            className="amount-input"
            value={amount}
            onFocus={handleInputFocus}
            onChange={handleInputChange}
            placeholder="0"
            autoComplete="off"
          />
        </div>

        {/* Quick Amount Chips */}
        <div className="quick-amount-chips">
          {quickAmounts.map((q) => (
            <button
              key={q}
              type="button"
              className="quick-chip"
              onClick={() => handleQuickAdd(q)}
            >
              +{q}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Modes */}
      <div className="form-group payment-modes-section">
        <label className="form-label">Select Payment Mode</label>
        <div className="payment-modes-grid">
          {paymentModes.map((mode) => {
            const isSelected = selectedMode === mode.id;
            return (
              <div
                key={mode.id}
                className={`payment-mode-item ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedMode(mode.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedMode(mode.id);
                  }
                }}
              >
                <div className={`checkbox-box ${isSelected ? 'checked' : ''}`}>
                  {isSelected && <Check size={12} strokeWidth={3} color="#ffffff" />}
                </div>
                <div className="mode-icon-wrap">{mode.icon}</div>
                <span className="mode-title">{mode.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        id="generate-qr-btn"
        className="primary-action-btn"
        onClick={handleProceed}
      >
        {selectedMode === 'upi_qr' ? 'Generate QR' : 'Proceed'}
      </button>
    </div>
  );
}
