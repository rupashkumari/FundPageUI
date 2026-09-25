import React, { useState } from 'react';
import {
  X,
  Check,
  AlertCircle,
  ChevronDown,
  ShieldCheck,
  Smartphone,
  Building2,
  Landmark,
  CreditCard
} from 'lucide-react';

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
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');

  const quickAmounts = [1000, 5000, 10000];

  const handleQuickAdd = (addValue) => {
    setErrorMessage('');

    const current = parseFloat(amount) || 0;

    setAmount((current + addValue).toString());
  };

  const handleInputChange = (e) => {
    let val = e.target.value;

    setErrorMessage('');

    // Remove unnecessary leading zeros
    if (/^0[0-9]/.test(val)) {
      val = val.replace(/^0+/, '');
    }

    // Allow integers or up to 2 decimal places
    if (val === '' || /^\d*(\.\d{0,2})?$/.test(val)) {
      setAmount(val);
    }
  };

  const handleInputFocus = () => {
    if (amount === '0') {
      setAmount('');
    }
  };

  const handleModeChange = (mode) => {
    setErrorMessage('');
    setSelectedMode(mode);
  };

  const handleProceed = () => {
    const parsed = parseFloat(amount);

    if (!amount || isNaN(parsed) || parsed <= 0) {
      setErrorMessage('Please enter a valid amount to proceed.');
      return;
    }

    // UPI ID validation
    if (selectedMode === 'upi_id') {
      if (!upiId.trim()) {
        setErrorMessage('Please enter your UPI ID.');
        return;
      }

      if (!upiId.includes('@')) {
        setErrorMessage('Please enter a valid UPI ID.');
        return;
      }
    }

    // Net Banking validation
    if (selectedMode === 'net_banking') {
      if (!selectedBank) {
        setErrorMessage('Please select your bank.');
        return;
      }
    }

    // IMPS / NEFT / RTGS validation
    if (selectedMode === 'imps_neft') {
      if (!selectedBank || !accountNumber || !ifsc) {
        setErrorMessage('Please enter all required bank details.');
        return;
      }
    }

    setErrorMessage('');

    // Keep your existing QR flow untouched
    if (selectedMode === 'upi_qr') {
      onGenerateQR();
    }
  };

  const paymentModes = [
    {
      id: 'upi_qr',
      title: 'UPI QR',
      subtitle: 'Scan & Pay',
      icon: <UpiLogo />,
    },
    {
      id: 'upi_id',
      title: 'UPI ID',
      subtitle: 'Pay using UPI',
      icon: <UpiLogo />,
    },
    {
      id: 'net_banking',
      title: 'Net Banking',
      subtitle: 'Bank transfer',
      icon: <NetBankingLogo />,
    },
    {
      id: 'imps_neft',
      title: 'IMPS / NEFT / RTGS',
      subtitle: 'Direct bank transfer',
      icon: <BankLogo />,
    },
  ];

  return (
    <div className="modal-card add-funds-card">

      {/* ================= HEADER ================= */}
      <div className="card-header">
        <div>
          <h2 className="card-title">Add Funds</h2>
          <p className="card-subtitle">
            {/* Add money securely to your trading account */}
          </p>
        </div>

        <button
          type="button"
          className="close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} strokeWidth={2.2} />
        </button>
      </div>


      {/* ================= BALANCE ================= */}
      <div className="balance-card">
        <div className="balance-left">
          <span className="balance-label">Available Balance</span>

          <span className="balance-value">
            ₹{' '}
            {availableBalance.toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </span>
        </div>

        <div className="balance-icon">
          <CreditCard size={18} />
        </div>
      </div>


      {/* ================= ERROR ================= */}
      {errorMessage && (
        <div className="popup-toast-wrapper" role="alert">
          <div className="popup-toast">
            <AlertCircle
              size={16}
              className="popup-toast-icon"
            />

            <span className="popup-toast-msg">
              {errorMessage}
            </span>

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


      {/* ================= ENTER AMOUNT ================= */}
      <div className="form-group amount-section">

        <div className="section-heading-row">
          <label
            htmlFor="amount-input"
            className="form-label"
          >
            Enter Amount
          </label>

          <span className="amount-hint">
            Minimum ₹1
          </span>
        </div>

        <div
          className={`amount-input-wrapper ${errorMessage ? 'has-error' : ''
            }`}
        >
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


        {/* QUICK AMOUNTS */}
        <div className="quick-amount-chips">
          {quickAmounts.map((q) => (
            <button
              key={q}
              type="button"
              className="quick-chip"
              onClick={() => handleQuickAdd(q)}
            >
              + {q.toLocaleString('en-IN')}
            </button>
          ))}
        </div>
      </div>


      {/* ================= PAYMENT MODES ================= */}
      <div className="form-group payment-modes-section">

        <div className="section-heading-row">
          <label className="form-label">
            Select Payment Mode
          </label>

          <span className="required-text">
            Required
          </span>
        </div>


        <div className="payment-modes-grid">

          {paymentModes.map((mode) => {

            const isSelected =
              selectedMode === mode.id;

            return (
              <button
                key={mode.id}
                type="button"
                className={`payment-mode-item ${isSelected ? 'selected' : ''
                  }`}
                onClick={() => handleModeChange(mode.id)}
              >

                <div
                  className={`checkbox-box ${isSelected ? 'checked' : ''
                    }`}
                >
                  {isSelected && (
                    <Check
                      size={12}
                      strokeWidth={3}
                      color="#ffffff"
                    />
                  )}
                </div>

                <div className="mode-icon-wrap">
                  {mode.icon}
                </div>

                <div className="mode-text">

                  <span className="mode-title">
                    {mode.title}
                  </span>

                  <span className="mode-subtitle">
                    {mode.subtitle}
                  </span>

                </div>

              </button>
            );
          })}

        </div>
      </div>


      {/* =================================================
          UPI ID
         ================================================= */}
      {selectedMode === 'upi_id' && (
        <div className="payment-details-card">

          <div className="details-card-header">

            <div className="details-icon upi-details-icon">
              <Smartphone size={18} />
            </div>

            <div>
              <h3>Enter UPI ID</h3>
              <p>Use your registered UPI ID to pay</p>
            </div>

          </div>

          <label className="details-label">
            UPI ID
          </label>

          <div className="details-input-wrapper">

            <Smartphone size={17} />

            <input
              type="text"
              value={upiId}
              onChange={(e) => {
                setUpiId(e.target.value);
                setErrorMessage('');
              }}
              placeholder="example@upi"
              autoComplete="off"
            />

          </div>

          <div className="details-info">
            Your UPI ID will be used to initiate the payment.
          </div>

        </div>
      )}


      {/* =================================================
          NET BANKING
         ================================================= */}
      {selectedMode === 'net_banking' && (
        <div className="payment-details-card">

          <div className="details-card-header">

            <div className="details-icon bank-details-icon">
              <Building2 size={18} />
            </div>

            <div>
              <h3>Net Banking</h3>
              <p>Select your bank to continue</p>
            </div>

          </div>

          <label className="details-label">
            Select Bank
          </label>

          <div className="select-input-wrapper">

            <Building2 size={17} />

            <select
              value={selectedBank}
              onChange={(e) => {
                setSelectedBank(e.target.value);
                setErrorMessage('');
              }}
            >
              <option value="">
                Select your bank
              </option>

              <option value="HDFC Bank">
                HDFC Bank
              </option>

              <option value="ICICI Bank">
                ICICI Bank
              </option>

              <option value="State Bank of India">
                State Bank of India
              </option>

              <option value="Axis Bank">
                Axis Bank
              </option>

              <option value="Kotak Mahindra Bank">
                Kotak Mahindra Bank
              </option>

            </select>

            <ChevronDown size={17} />

          </div>

          <div className="details-info">
            You will be redirected to your bank's secure
            login page.
          </div>

        </div>
      )}


      {/* =================================================
          IMPS / NEFT / RTGS
         ================================================= */}
      {selectedMode === 'imps_neft' && (
        <div className="payment-details-card">

          <div className="details-card-header">

            <div className="details-icon transfer-details-icon">
              <Landmark size={18} />
            </div>

            <div>
              <h3>Bank Transfer</h3>
              <p>Enter your bank account details</p>
            </div>

          </div>


          <label className="details-label">
            Select Bank
          </label>

          <div className="select-input-wrapper">

            <Building2 size={17} />

            <select
              value={selectedBank}
              onChange={(e) => {
                setSelectedBank(e.target.value);
                setErrorMessage('');
              }}
            >
              <option value="">
                Select your bank
              </option>

              <option value="HDFC Bank">
                HDFC Bank
              </option>

              <option value="ICICI Bank">
                ICICI Bank
              </option>

              <option value="State Bank of India">
                State Bank of India
              </option>

              <option value="Axis Bank">
                Axis Bank
              </option>

              <option value="Kotak Mahindra Bank">
                Kotak Mahindra Bank
              </option>

            </select>

            <ChevronDown size={17} />

          </div>


          <label className="details-label">
            Account Number
          </label>

          <div className="details-input-wrapper">

            <CreditCard size={17} />

            <input
              type="text"
              inputMode="numeric"
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(
                  e.target.value.replace(/\D/g, '')
                );
                setErrorMessage('');
              }}
              placeholder="Enter account number"
            />

          </div>


          <label className="details-label">
            IFSC Code
          </label>

          <div className="details-input-wrapper">

            <Landmark size={17} />

            <input
              type="text"
              value={ifsc}
              onChange={(e) => {
                setIfsc(
                  e.target.value.toUpperCase()
                );
                setErrorMessage('');
              }}
              placeholder="Enter IFSC code"
              autoComplete="off"
            />

          </div>

          <div className="details-info">
            Use the bank details registered with your
            trading account.
          </div>

        </div>
      )}


      {/* ================= SECURITY ================= */}
      <div className="security-footer">
        <ShieldCheck size={15} />

        <span className="security-text">
          Your payment information is secure
        </span>
      </div>


      {/* ================= PRIMARY BUTTON ================= */}
      <button
        type="button"
        id="generate-qr-btn"
        className="primary-action-btn"
        onClick={handleProceed}
      >

        {selectedMode === 'upi_qr'
          ? 'Generate QR'
          : selectedMode === 'upi_id'
            ? 'Continue with UPI'
            : selectedMode === 'net_banking'
              ? 'Continue to Net Banking'
              : 'Continue with Bank Transfer'}

      </button>

    </div>
  );
}