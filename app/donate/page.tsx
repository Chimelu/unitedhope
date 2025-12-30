'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

/**
 * Donate page - Shows projects first, then donation form when project is selected
 */
type PaymentMethod = 'card' | 'bank' | 'crypto' | 'cashapp' | 'paypal' | null;

interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  targetAmount: number;
  currentAmount: number;
  status: 'active' | 'completed';
}

interface Donation {
  _id: string;
  name: string;
  amount: number;
  paymentMethod: string;
  message?: string;
  createdAt: string;
}

function DonatePageContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project');
  
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [showDonorsModal, setShowDonorsModal] = useState(false);
  const [donorsList, setDonorsList] = useState<Donation[]>([]);
  const [loadingDonors, setLoadingDonors] = useState(false);
  const [projectForDonors, setProjectForDonors] = useState<Project | null>(null);

  useEffect(() => {
    // Fetch projects from API
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        if (data.projects) {
          setProjectsList(data.projects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Check if project ID is in URL
    if (projectId && projectsList.length > 0) {
      const project = projectsList.find(p => p._id === projectId);
      if (project) {
        setSelectedProject(project);
        setShowForm(true);
      }
    }
  }, [projectId, projectsList]);

  const presetAmounts = ['25', '50', '100', '250', '500', '1000'];

  const [paymentDetails, setPaymentDetails] = useState<{
    bank: Array<{
      _id: string;
      currency: string;
      accountName: string;
      accountNumber: string;
      routingNumber: string;
      bankName: string;
      swift: string;
      iban: string;
    }>;
    crypto: Array<{
      _id: string;
      currency: string;
      walletAddress: string;
      network: string;
    }>;
    cashapp: Array<{
      _id: string;
      cashTag: string;
    }>;
    paypal: Array<{
      _id: string;
      email: string;
    }>;
  }>({
    bank: [],
    crypto: [],
    cashapp: [],
    paypal: [],
  });

  useEffect(() => {
    // Fetch payment details from API (only active ones)
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch('/api/payment-details?activeOnly=true');
        const data = await response.json();
        if (data.paymentDetails) {
          const bankDetails = data.paymentDetails.filter((pd: any) => pd.type === 'bank');
          const cryptoDetails = data.paymentDetails.filter((pd: any) => pd.type === 'crypto');
          const cashappDetails = data.paymentDetails.filter((pd: any) => pd.type === 'cashapp');
          const paypalDetails = data.paymentDetails.filter((pd: any) => pd.type === 'paypal');
          setPaymentDetails({
            bank: bankDetails,
            crypto: cryptoDetails,
            cashapp: cashappDetails,
            paypal: paypalDetails,
          });
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
      }
    };

    fetchPaymentDetails();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setShowForm(true);
    // Scroll to form
    setTimeout(() => {
      document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleViewDonors = async (project: Project, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering
    setProjectForDonors(project);
    setLoadingDonors(true);
    setShowDonorsModal(true);
    
    try {
      const response = await fetch(`/api/projects/${project._id}/donations`);
      const data = await response.json();
      if (data.donations) {
        setDonorsList(data.donations);
      } else {
        setDonorsList([]);
      }
    } catch (error) {
      console.error('Error fetching donors:', error);
      toast.error('Failed to load donors');
      setDonorsList([]);
    } finally {
      setLoadingDonors(false);
    }
  };

  const handleGeneralDonate = () => {
    setSelectedProject(null);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleAmountClick = (value: string) => {
    setAmount(value);
    setCustomAmount('');
    setIsCustom(false);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount('');
    setIsCustom(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    const donationAmount = isCustom ? customAmount : amount;
    if (!donationAmount || Number(donationAmount) <= 0) {
      toast.error('Please enter a valid donation amount');
      return;
    }

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: selectedProject?._id || null,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          amount: donationAmount,
          paymentMethod,
          message: formData.message,
        }),
      });

      if (response.ok) {
        // Send donation confirmation email
        try {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'donation',
              donorEmail: formData.email,
              donorName: formData.name,
              amount: Number(donationAmount),
              paymentMethod: paymentMethod,
            }),
          });
        } catch (emailError) {
          console.error('Error sending donation confirmation email:', emailError);
          // Don't fail the donation if email fails
        }

        toast.success('Thank you for your donation! Your contribution has been recorded.');
        // Reset form
        setAmount('');
        setCustomAmount('');
        setIsCustom(false);
        setPaymentMethod(null);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setShowForm(false);
        setSelectedProject(null);
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to process donation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      toast.error('Failed to process donation. Please try again.');
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  // If form should be shown, display it
  if (showForm) {
    return (
      <div className="min-h-screen bg-red-900 relative overflow-hidden py-12">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.03) 10px,
              rgba(255,255,255,0.03) 20px
            )`
          }}></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-800 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl opacity-20"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => {
              setShowForm(false);
              setSelectedProject(null);
              window.history.pushState({}, '', '/donate');
            }}
                  className="mb-8 text-white hover:text-red-500 font-semibold inline-flex items-center text-lg bg-red-800/60 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>

          {/* Selected Project Info */}
          {selectedProject && (
            <div className="bg-red-800/60 backdrop-blur-sm rounded-xl shadow-xl p-6 mb-8 border border-red-700/50">
              <div className="flex items-center gap-6">
                <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm text-red-500 font-semibold mb-2 uppercase tracking-wide">{selectedProject.category}</div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h2>
                  <p className="text-white text-sm leading-relaxed">{selectedProject.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              {selectedProject ? `Support: ${selectedProject.title}` : 'Make a Donation'}
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-white max-w-2xl mx-auto font-light">
              Your generosity helps us continue our mission. Choose your preferred payment method below.
            </p>
          </div>

          {/* Rest of donation form - keeping existing form code */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Donation Form */}
            <div id="donation-form" className="lg:col-span-2 bg-red-800/60 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-red-700/50">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Donation Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Select Amount (USD)
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {presetAmounts.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleAmountClick(preset)}
                        className={`py-3 px-4 rounded-lg border-2 font-semibold transition-colors ${
                          amount === preset
                            ? 'border-red-600 bg-red-600 text-white'
                            : 'border-red-700 bg-red-700/50 text-white hover:border-red-600 hover:bg-red-700'
                        }`}
                      >
                        ${preset}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-white mb-2">
                      Or enter custom amount
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                    />
                  </div>
                  {(amount || customAmount) && (
                    <p className="mt-3 text-lg font-semibold text-red-500">
                      Amount: ${isCustom ? customAmount : amount}
                    </p>
                  )}
                </div>

                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Select Payment Method *
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        paymentMethod === 'bank'
                          ? 'border-red-600 bg-red-600/20'
                          : 'border-red-700 bg-red-800/50 hover:border-red-600'
                      }`}
                    >
                      <div className="text-center">
                        <svg className={`w-12 h-12 mx-auto mb-2 ${paymentMethod === 'bank' ? 'text-red-500' : 'text-gray-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                        <div className={`font-semibold ${paymentMethod === 'bank' ? 'text-white' : 'text-white'}`}>Bank Transfer</div>
                        <div className={`text-sm mt-1 ${paymentMethod === 'bank' ? 'text-gray-100' : 'text-gray-200'}`}>Wire transfer, ACH</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('crypto')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        paymentMethod === 'crypto'
                          ? 'border-red-600 bg-red-600/20'
                          : 'border-red-700 bg-red-800/50 hover:border-red-600'
                      }`}
                    >
                      <div className="text-center">
                        <svg className={`w-12 h-12 mx-auto mb-2 ${paymentMethod === 'crypto' ? 'text-red-500' : 'text-gray-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className={`font-semibold ${paymentMethod === 'crypto' ? 'text-white' : 'text-white'}`}>Cryptocurrency</div>
                        <div className={`text-sm mt-1 ${paymentMethod === 'crypto' ? 'text-gray-100' : 'text-gray-200'}`}>BTC, ETH, USDT, USDC</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Bank Transfer Details */}
                {paymentMethod === 'bank' && (
                  <div className="p-4 bg-white/90 rounded-lg border-2 border-red-600">
                    <h3 className="font-semibold text-gray-900 mb-4">Bank Transfer Details</h3>
                    
                    {paymentDetails.bank.length === 0 ? (
                      <p className="text-gray-600 text-sm">No bank account details available. Please contact support.</p>
                    ) : (
                      <div className="space-y-6">
                        {paymentDetails.bank.map((bank) => (
                          <div key={bank._id} className="mb-6">
                            <h4 className="font-medium text-gray-900 mb-3">{bank.currency.toUpperCase()} Account</h4>
                            <div className="space-y-2 text-sm">
                              {bank.accountName && (
                                <div className="flex justify-between">
                                  <span className="text-gray-700">Account Name:</span>
                                  <span className="font-mono font-semibold text-gray-900">{bank.accountName}</span>
                                </div>
                              )}
                              {bank.accountNumber && (
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-700">Account Number:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono font-semibold text-gray-900">{bank.accountNumber}</span>
                                    <button
                                      type="button"
                                      onClick={() => copyToClipboard(bank.accountNumber, 'Account Number')}
                                      className="text-red-600 hover:text-red-700 text-xs font-semibold"
                                    >
                                      Copy
                                    </button>
                                  </div>
                                </div>
                              )}
                              {bank.routingNumber && (
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-700">Routing Number:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono font-semibold text-gray-900">{bank.routingNumber}</span>
                                    <button
                                      type="button"
                                      onClick={() => copyToClipboard(bank.routingNumber, 'Routing Number')}
                                      className="text-red-600 hover:text-red-700 text-xs font-semibold"
                                    >
                                      Copy
                                    </button>
                                  </div>
                                </div>
                              )}
                              {bank.bankName && (
                                <div className="flex justify-between">
                                  <span className="text-gray-700">Bank Name:</span>
                                  <span className="font-semibold text-gray-900">{bank.bankName}</span>
                                </div>
                              )}
                              {bank.swift && (
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-700">SWIFT:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono font-semibold text-gray-900">{bank.swift}</span>
                                    <button
                                      type="button"
                                      onClick={() => copyToClipboard(bank.swift, 'SWIFT Code')}
                                      className="text-red-600 hover:text-red-700 text-xs font-semibold"
                                    >
                                      Copy
                                    </button>
                                  </div>
                                </div>
                              )}
                              {bank.iban && (
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-700">IBAN:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono font-semibold text-gray-900">{bank.iban}</span>
                                    <button
                                      type="button"
                                      onClick={() => copyToClipboard(bank.iban, 'IBAN')}
                                      className="text-red-600 hover:text-red-700 text-xs font-semibold"
                                    >
                                      Copy
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                      <p className="text-xs text-gray-800">
                        <strong>Note:</strong> After making a bank transfer, please email us at info@unitedhope.org 
                        with your transaction details. You can download our impact report from the Reports page.
                      </p>
                    </div>
                  </div>
                )}

                {/* Crypto Wallet Addresses */}
                {paymentMethod === 'crypto' && (
                  <div className="p-4 bg-white/90 rounded-lg border-2 border-red-600">
                    <h3 className="font-semibold text-gray-900 mb-4">Cryptocurrency Wallet Addresses</h3>
                    {paymentDetails.crypto.length === 0 ? (
                      <p className="text-gray-600 text-sm">No cryptocurrency wallet addresses available. Please contact support.</p>
                    ) : (
                      <div className="space-y-4">
                        {paymentDetails.crypto.map((crypto) => (
                          <div key={crypto._id}>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                              {crypto.currency} {crypto.network && `(${crypto.network})`}
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={crypto.walletAddress}
                                readOnly
                                className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-mono text-sm text-gray-900"
                              />
                              <button
                                type="button"
                                onClick={() => copyToClipboard(crypto.walletAddress, `${crypto.currency} address`)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
                              >
                                Copy
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                      <p className="text-xs text-gray-800">
                        <strong>Note:</strong> After sending cryptocurrency, please email us at info@unitedhope.org 
                        with your transaction hash. You can download our impact report from the Reports page.
                      </p>
                    </div>
                  </div>
                )}

                {/* CashApp Payment Details */}
                {paymentMethod === 'cashapp' && (
                  <div className="p-4 bg-white/90 rounded-lg border-2 border-red-600">
                    <h3 className="font-semibold text-gray-900 mb-4">CashApp Payment Details</h3>
                    {paymentDetails.cashapp.length === 0 ? (
                      <p className="text-gray-600 text-sm">No CashApp details available. Please contact support.</p>
                    ) : (
                      <div className="space-y-4">
                        {paymentDetails.cashapp.map((cashapp) => (
                          <div key={cashapp._id}>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                              CashApp Tag ($Cashtag)
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={cashapp.cashTag || ''}
                                readOnly
                                className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-mono text-sm text-gray-900"
                              />
                              <button
                                type="button"
                                onClick={() => copyToClipboard(cashapp.cashTag || '', 'CashApp Tag')}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
                              >
                                Copy
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                      <p className="text-xs text-gray-800">
                        <strong>Note:</strong> After sending via CashApp, please email us at info@unitedhope.org 
                        with your transaction details. You can download our impact report from the Reports page.
                      </p>
                    </div>
                  </div>
                )}

                {/* PayPal Payment Details */}
                {paymentMethod === 'paypal' && (
                  <div className="p-4 bg-white/90 rounded-lg border-2 border-red-600">
                    <h3 className="font-semibold text-gray-900 mb-4">PayPal Payment Details</h3>
                    {paymentDetails.paypal.length === 0 ? (
                      <p className="text-gray-600 text-sm">No PayPal details available. Please contact support.</p>
                    ) : (
                      <div className="space-y-4">
                        {paymentDetails.paypal.map((paypal) => (
                          <div key={paypal._id}>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                              PayPal Email
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={paypal.email || ''}
                                readOnly
                                className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-mono text-sm text-gray-900"
                              />
                              <button
                                type="button"
                                onClick={() => copyToClipboard(paypal.email || '', 'PayPal Email')}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
                              >
                                Copy
                              </button>
                            </div>
                            <div className="mt-4">
                              <a
                                href={`https://www.paypal.com/paypalme/${paypal.email?.replace('@', '') || ''}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                              >
                                Send via PayPal
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                      <p className="text-xs text-gray-800">
                        <strong>Note:</strong> After sending via PayPal, please email us at info@unitedhope.org 
                        with your transaction details. You can download our impact report from the Reports page.
                      </p>
                    </div>
                  </div>
                )}

                {/* Donor Information */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                    placeholder="Leave a message with your donation..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={!amount && !customAmount && !paymentMethod}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Confirm Donation Details
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-red-800/60 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-red-700/50">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Why Your Donation Matters
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Direct support for individuals and families in need</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Transparent use of funds with regular impact reports</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Tax-deductible donations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Secure and safe payment processing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show projects selection first
  return (
    <div className="min-h-screen bg-red-900 relative overflow-hidden py-12">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.03) 10px,
            rgba(255,255,255,0.03) 20px
          )`
        }}></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-800 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Support Our Projects
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-light">
            Choose a project to support or make a general donation. Every contribution makes a real difference.
          </p>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute top-2 left-2 w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            </div>
            <p className="text-white text-lg mt-6 font-medium">Loading projects...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projectsList.map((project) => {
              const progress = calculateProgress(project.currentAmount, project.targetAmount);
              return (
                <div
                  key={project._id}
                  className="bg-red-800/60 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-red-700/50 group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg ${
                          project.status === 'active'
                            ? 'bg-red-600 text-white'
                            : 'bg-green-500 text-white'
                        }`}
                      >
                        {project.status === 'active' ? 'Active' : 'Completed'}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-white text-sm font-medium mb-2 opacity-90">
                        {project.category}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-red-800/60 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-white mb-5 line-clamp-3 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mb-5">
                      <div className="flex justify-between text-xs font-semibold text-white mb-2">
                        <span>Raised: {formatCurrency(project.currentAmount)}</span>
                        <span>Goal: {formatCurrency(project.targetAmount)}</span>
                      </div>
                      <div className="w-full bg-red-900/50 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            project.status === 'completed'
                              ? 'bg-green-500'
                              : 'bg-gradient-to-r from-red-600 to-red-700'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs font-medium text-gray-100 mt-2">
                        {progress.toFixed(0)}% funded
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleProjectSelect(project)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Donate Now
                      </button>
                      <button
                        onClick={(e) => handleViewDonors(project, e)}
                        className="bg-red-700 hover:bg-red-600 text-white text-center py-3 px-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        title="View Donors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* General Donation Option */}
        <div className="bg-red-800/60 backdrop-blur-sm rounded-2xl shadow-2xl p-10 md:p-12 text-center border border-red-700/50">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Or Make a General Donation
          </h2>
          <p className="text-white mb-8 max-w-2xl mx-auto text-lg">
            Prefer to support our general fund? Your donation will be allocated where it's needed most across all our programs.
          </p>
          <button
            onClick={handleGeneralDonate}
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Donate to General Fund
          </button>
        </div>
      </div>

      {/* Donors Modal */}
      {showDonorsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowDonorsModal(false)}>
          <div className="bg-red-800/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-red-700/50" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-red-900/60 p-6 border-b border-red-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {projectForDonors?.title}
                  </h2>
                  <p className="text-gray-100 text-sm">People who have donated to this project</p>
                </div>
                <button
                  onClick={() => setShowDonorsModal(false)}
                  className="text-white hover:text-red-500 transition-colors p-2 hover:bg-red-700/50 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {loadingDonors ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative w-12 h-12">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute top-1.5 left-1.5 w-9 h-9 border-4 border-red-500 border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                  </div>
                  <p className="text-gray-100 mt-4 text-sm">Loading donors...</p>
                </div>
              ) : donorsList.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-gray-100 text-lg font-semibold">No donors yet</p>
                  <p className="text-gray-200 text-sm mt-2">Be the first to support this project!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mb-6 p-4 bg-red-900/50 rounded-lg border border-red-700/50">
                    <p className="text-gray-100 text-sm">
                      <span className="font-bold text-red-500">{donorsList.length}</span> {donorsList.length === 1 ? 'person has' : 'people have'} donated to this project
                    </p>
                  </div>
                  <div className="grid gap-4">
                    {donorsList.map((donation) => (
                      <div
                        key={donation._id}
                        className="bg-red-900/40 backdrop-blur-sm rounded-lg p-5 border border-red-700/50 hover:border-red-500/50 transition-all"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                              <span className="text-red-500 font-bold text-lg">
                                {donation.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-white font-semibold text-lg">{donation.name}</h3>
                              <p className="text-gray-200 text-xs capitalize">{donation.paymentMethod}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-red-500 font-bold text-xl">{formatCurrency(donation.amount)}</p>
                            <p className="text-gray-200 text-xs mt-1">
                              {new Date(donation.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        {donation.message && (
                          <div className="mt-3 pt-3 border-t border-red-700/50">
                            <p className="text-gray-100 text-sm italic">"{donation.message}"</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-red-900 relative overflow-hidden flex items-center justify-center">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.03) 10px,
              rgba(255,255,255,0.03) 20px
            )`
          }}></div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-800 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl opacity-20"></div>
        <div className="relative flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute top-2 left-2 w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
          </div>
          <p className="text-white text-lg mt-6 font-medium">Loading...</p>
        </div>
      </div>
    }>
      <DonatePageContent />
    </Suspense>
  );
}
