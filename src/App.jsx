import React, { useState } from 'react';
import AddFundsModal from './components/AddFundsModal';
import ScanAndPayModal from './components/ScanAndPayModal';
import './index.css';

export default function App() {
  const [amount, setAmount] = useState('');
  const [availableBalance, setAvailableBalance] = useState(0.0);
  const [selectedMode, setSelectedMode] = useState('upi_qr');
  const [showQRModal, setShowQRModal] = useState(false);

  const handleGenerateQR = () => {
    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      return;
    }
    setShowQRModal(true);
  };

  const handleCloseQRModal = () => {
    setShowQRModal(false);
  };

  const handleCloseAddFunds = () => {
    // Reset or dismiss feedback if user clicks outer modal close
    console.log('Close Add Funds clicked');
  };

  return (
    <div className="page-wrapper">
      <main className="main-viewport">
        {/* Primary Add Funds View (Screenshot 1) */}
        <AddFundsModal
          amount={amount}
          setAmount={setAmount}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          availableBalance={availableBalance}
          onGenerateQR={handleGenerateQR}
          onClose={handleCloseAddFunds}
        />

        {/* Scan & Pay QR Overlay View (Screenshot 2) */}
        {showQRModal && (
          <ScanAndPayModal
            amount={amount === '0' || !amount ? '100' : amount}
            recipientName="Jainam"
            upiId="7021109502@slc"
            onClose={handleCloseQRModal}
          />
        )}
      </main>
    </div>
  );
}
