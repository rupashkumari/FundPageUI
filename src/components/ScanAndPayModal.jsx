import React, { useState, useEffect } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldLockIcon } from './PaymentIcons';

export default function ScanAndPayModal({
  amount = 100,
  recipientName = "Jainam",
  upiId = "7021109502@slc",
  onClose
}) {
  // 5 minutes countdown timer (300 seconds -> 05:00)
  const [timeLeft, setTimeLeft] = useState(300);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleRefresh = () => {
    setTimeLeft(300);
    setIsExpired(false);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const parsedAmount = parseFloat(amount) > 0 ? parseFloat(amount) : 100;
  const formattedAmount = parsedAmount.toFixed(2);
  const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(recipientName)}&am=${formattedAmount}&cu=INR&tn=AddFunds`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card scan-pay-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="scan-and-pay-title"
      >
        {/* Header */}
        <div className="card-header scan-header">
          <div>
            <h2 id="scan-and-pay-title" className="card-title">
              Scan and Pay
            </h2>
            <p className="card-subtitle">Transferring funds to {recipientName}</p>
          </div>
          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Close QR Modal"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>

        {/* Amount Summary Row */}
        <div className="amount-summary-row">
          <span className="summary-label">Amount</span>
          <span className="summary-value">₹{formattedAmount}</span>
        </div>

        {/* QR Code Container */}
        <div className="qr-container-wrapper">
          <div className="qr-box">
            {isExpired ? (
              <div className="qr-expired-overlay">
                <p>QR code expired</p>
                <button type="button" className="refresh-btn" onClick={handleRefresh}>
                  <RefreshCw size={14} /> Refresh QR
                </button>
              </div>
            ) : (
              <QRCodeSVG
                value={upiUri}
                size={164}
                level="M"
                includeMargin={false}
              />
            )}
          </div>
        </div>

        {/* Timer Notice */}
        <div className="timer-notice">
          {!isExpired ? (
            <>
              This QR is valid for{' '}
              <span className="timer-highlight">{formatTimer(timeLeft)}</span>
            </>
          ) : (
            <span className="timer-expired">This QR has expired</span>
          )}
        </div>

        {/* Supported UPI App Pills */}
        <div className="upi-apps-row">
          <span className="app-badge">GPay</span>
          <span className="app-badge">PhonePe</span>
          <span className="app-badge">Paytm</span>
          <span className="app-badge">BHIM</span>
        </div>

        {/* How to Pay Section */}
        <div className="how-to-pay-section">
          <h3 className="how-to-pay-title">How to pay</h3>
          <div className="steps-list">
            {/* Step 1 */}
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4 className="step-heading">Open your UPI app</h4>
                <p className="step-desc">
                  Open Google Pay, PhonePe, Paytm or any other UPI app.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4 className="step-heading">Scan the QR code</h4>
                <p className="step-desc">
                  Scan the QR code displayed above.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4 className="step-heading">Complete the payment</h4>
                <p className="step-desc">
                  Pay ₹{Math.round(parsedAmount)} using your UPI app.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Security Badge */}
        <div className="security-footer">
          <ShieldLockIcon />
          <span className="security-text">Your payment is secured by UPI</span>
        </div>
      </div>
    </div>
  );
}
