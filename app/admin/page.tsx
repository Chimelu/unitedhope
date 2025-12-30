'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  targetAmount: number;
  currentAmount: number;
  status: 'active' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

interface Donation {
  _id: string;
  projectId: string | null;
  name: string;
  email: string;
  phone: string;
  amount: number;
  paymentMethod: string;
  message: string;
  createdAt: string;
}

interface PaymentDetail {
  _id: string;
  type: 'bank' | 'crypto' | 'cashapp' | 'paypal';
  currency?: string;
  accountName?: string;
  accountNumber?: string;
  routingNumber?: string;
  bankName?: string;
  swift?: string;
  iban?: string;
  walletAddress?: string;
  network?: string;
  cashTag?: string;
  email?: string;
  isActive: boolean;
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [showDonations, setShowDonations] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetail[]>([]);
  const [editingPaymentDetail, setEditingPaymentDetail] = useState<PaymentDetail | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    imageUrl: '',
    targetAmount: '',
    currentAmount: '',
    status: 'active' as 'active' | 'completed',
  });

  const [paymentFormData, setPaymentFormData] = useState({
    type: 'bank' as 'bank' | 'crypto' | 'cashapp' | 'paypal',
    currency: '',
    accountName: '',
    accountNumber: '',
    routingNumber: '',
    bankName: '',
    swift: '',
    iban: '',
    walletAddress: '',
    network: '',
    cashTag: '',
    email: '',
    isActive: true,
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchPaymentDetails();
  }, []);

  const fetchPaymentDetails = async () => {
    try {
      const response = await fetch('/api/payment-details');
      const data = await response.json();
      setPaymentDetails(data.paymentDetails || []);
    } catch (error) {
      console.error('Error fetching payment details:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
        toast.success('Image uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that either imageUrl is provided or an image was uploaded
    if (!formData.imageUrl) {
      toast.error('Please provide an image URL or upload an image');
      return;
    }
    
    try {
      const url = editingProject
        ? `/api/projects/${editingProject._id}`
        : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          targetAmount: Number(formData.targetAmount),
          currentAmount: Number(formData.currentAmount || 0),
        }),
      });

      if (response.ok) {
        await fetchProjects();
        resetForm();
        toast.success(editingProject ? 'Project updated successfully!' : 'Project created successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      imageUrl: project.imageUrl,
      targetAmount: project.targetAmount.toString(),
      currentAmount: project.currentAmount.toString(),
      status: project.status,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchProjects();
        toast.success('Project deleted successfully!');
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleViewDonations = async (project: Project) => {
    setSelectedProject(project);
    try {
      const response = await fetch(`/api/projects/${project._id}/donations`);
      const data = await response.json();
      setDonations(data.donations || []);
      setShowDonations(true);
    } catch (error) {
      console.error('Error fetching donations:', error);
      toast.error('Failed to fetch donations');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      imageUrl: '',
      targetAmount: '',
      currentAmount: '',
      status: 'active',
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const resetPaymentForm = () => {
    setPaymentFormData({
      type: 'bank',
      currency: '',
      accountName: '',
      accountNumber: '',
      routingNumber: '',
      bankName: '',
      swift: '',
      iban: '',
      walletAddress: '',
      network: '',
      cashTag: '',
      email: '',
      isActive: true,
    });
    setEditingPaymentDetail(null);
    setShowPaymentForm(false);
  };

  const handleEditPaymentDetail = (paymentDetail: PaymentDetail) => {
    setEditingPaymentDetail(paymentDetail);
    setPaymentFormData({
      type: paymentDetail.type,
      currency: paymentDetail.currency || '',
      accountName: paymentDetail.accountName || '',
      accountNumber: paymentDetail.accountNumber || '',
      routingNumber: paymentDetail.routingNumber || '',
      bankName: paymentDetail.bankName || '',
      swift: paymentDetail.swift || '',
      iban: paymentDetail.iban || '',
      walletAddress: paymentDetail.walletAddress || '',
      network: paymentDetail.network || '',
      cashTag: paymentDetail.cashTag || '',
      email: paymentDetail.email || '',
      isActive: paymentDetail.isActive,
    });
    setShowPaymentForm(true);
  };

  const handleDeletePaymentDetail = async (id: string) => {
    if (!confirm('Are you sure you want to delete this payment detail?')) {
      return;
    }

    try {
      const response = await fetch(`/api/payment-details/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchPaymentDetails();
        toast.success('Payment detail deleted successfully!');
      } else {
        toast.error('Failed to delete payment detail');
      }
    } catch (error) {
      console.error('Error deleting payment detail:', error);
      toast.error('Failed to delete payment detail');
    }
  };

  const handlePaymentFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingPaymentDetail
        ? `/api/payment-details/${editingPaymentDetail._id}`
        : '/api/payment-details';
      const method = editingPaymentDetail ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentFormData),
      });

      if (response.ok) {
        await fetchPaymentDetails();
        resetPaymentForm();
        toast.success(editingPaymentDetail ? 'Payment detail updated successfully!' : 'Payment detail created successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save payment detail');
      }
    } catch (error) {
      console.error('Error saving payment detail:', error);
      toast.error('Failed to save payment detail');
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-red-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (showDonations && selectedProject) {
    return (
      <div className="min-h-screen bg-red-900 relative overflow-hidden py-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-800 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => {
              setShowDonations(false);
              setSelectedProject(null);
            }}
            className="mb-8 text-white hover:text-red-500 font-semibold inline-flex items-center text-lg bg-red-800/60 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Donations for: {selectedProject.title}
          </h1>

          <div className="bg-red-800/60 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-8 border border-red-700/50">
            {donations.length === 0 ? (
              <p className="text-white text-center py-8">No donations yet for this project.</p>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-red-700">
                        <th className="pb-4 text-white font-semibold">Name</th>
                        <th className="pb-4 text-white font-semibold">Email</th>
                        <th className="pb-4 text-white font-semibold">Phone</th>
                        <th className="pb-4 text-white font-semibold">Amount</th>
                        <th className="pb-4 text-white font-semibold">Payment Method</th>
                        <th className="pb-4 text-white font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((donation) => (
                        <tr key={donation._id} className="border-b border-red-700/50">
                          <td className="py-4 text-white">{donation.name}</td>
                          <td className="py-4 text-white">{donation.email}</td>
                          <td className="py-4 text-white">{donation.phone}</td>
                          <td className="py-4 text-red-500 font-semibold">{formatCurrency(donation.amount)}</td>
                          <td className="py-4 text-white capitalize">{donation.paymentMethod}</td>
                          <td className="py-4 text-white">
                            {new Date(donation.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {donations.map((donation) => (
                    <div key={donation._id} className="bg-red-700/50 rounded-lg p-4 border border-red-600/50">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-gray-100 text-xs mb-1">Name:</p>
                            <p className="text-white font-semibold text-lg">{donation.name}</p>
                            <p className="text-gray-100 text-xs mt-2">Email:</p>
                            <p className="text-gray-100 text-sm">{donation.email}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-100 text-xs mb-1">Amount:</p>
                            <p className="text-red-500 font-bold text-lg">{formatCurrency(donation.amount)}</p>
                            <p className="text-gray-100 text-xs mt-2 capitalize">{donation.paymentMethod}</p>
                          </div>
                        </div>
                        {donation.phone && (
                          <div>
                            <p className="text-gray-100 text-xs">Phone:</p>
                            <p className="text-gray-100 text-sm">{donation.phone}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-gray-100 text-xs">Date:</p>
                          <p className="text-gray-200 text-xs">
                            {new Date(donation.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-red-700">
                  <p className="text-white text-lg">
                    <span className="font-semibold">Total Donations:</span>{' '}
                    <span className="text-red-500">
                      {formatCurrency(donations.reduce((sum, d) => sum + d.amount, 0))}
                    </span>
                  </p>
                  <p className="text-white mt-2">
                    <span className="font-semibold">Total Donors:</span> {donations.length}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (showPaymentForm) {
    return (
      <div className="min-h-screen bg-red-900 relative overflow-hidden py-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-800 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={resetPaymentForm}
            className="mb-8 text-white hover:text-red-500 font-semibold inline-flex items-center text-lg bg-red-800/60 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Payment Details
          </button>

          <div className="bg-red-800/60 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-red-700/50">
            <h1 className="text-3xl font-bold text-white mb-8">
              {editingPaymentDetail ? 'Edit Payment Details' : 'Create Payment Details'}
            </h1>

            <form onSubmit={handlePaymentFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Type *
                </label>
                <select
                  required
                  value={paymentFormData.type}
                  onChange={(e) => setPaymentFormData({ ...paymentFormData, type: e.target.value as 'bank' | 'crypto' | 'cashapp' | 'paypal' })}
                  className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="crypto">Cryptocurrency</option>
                  <option value="cashapp">CashApp</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              {paymentFormData.type === 'bank' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Currency (e.g., USD, EUR) *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentFormData.currency}
                      onChange={(e) => setPaymentFormData({ ...paymentFormData, currency: e.target.value })}
                      placeholder="USD"
                      className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Account Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentFormData.accountName}
                      onChange={(e) => setPaymentFormData({ ...paymentFormData, accountName: e.target.value })}
                      className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentFormData.accountNumber}
                      onChange={(e) => setPaymentFormData({ ...paymentFormData, accountNumber: e.target.value })}
                      className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Routing Number
                    </label>
                    <input
                      type="text"
                      value={paymentFormData.routingNumber}
                      onChange={(e) => setPaymentFormData({ ...paymentFormData, routingNumber: e.target.value })}
                      className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={paymentFormData.bankName}
                      onChange={(e) => setPaymentFormData({ ...paymentFormData, bankName: e.target.value })}
                      className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      SWIFT Code
                    </label>
                    <input
                      type="text"
                      value={paymentFormData.swift}
                      onChange={(e) => setPaymentFormData({ ...paymentFormData, swift: e.target.value })}
                      className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      IBAN
                    </label>
                    <input
                      type="text"
                      value={paymentFormData.iban}
                      onChange={(e) => setPaymentFormData({ ...paymentFormData, iban: e.target.value })}
                      className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                    />
                  </div>
                </>
              )}

              {paymentFormData.type === 'crypto' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Currency/Network (e.g., Bitcoin, Ethereum, USDT) *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentFormData.currency}
                      onChange={(e) => setPaymentFormData({ ...paymentFormData, currency: e.target.value })}
                      placeholder="Bitcoin"
                      className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Wallet Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentFormData.walletAddress}
                      onChange={(e) => setPaymentFormData({ ...paymentFormData, walletAddress: e.target.value })}
                      className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Network (e.g., BTC, ETH, ERC20)
                    </label>
                    <input
                      type="text"
                      value={paymentFormData.network}
                      onChange={(e) => setPaymentFormData({ ...paymentFormData, network: e.target.value })}
                      className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                    />
                  </div>
                </>
              )}

              {paymentFormData.type === 'cashapp' && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    CashApp Tag ($Cashtag) *
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentFormData.cashTag}
                    onChange={(e) => setPaymentFormData({ ...paymentFormData, cashTag: e.target.value })}
                    placeholder="$UnitedHope"
                    className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                  />
                </div>
              )}

              {paymentFormData.type === 'paypal' && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    PayPal Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={paymentFormData.email}
                    onChange={(e) => setPaymentFormData({ ...paymentFormData, email: e.target.value })}
                    placeholder="donations@unitedhope.org"
                    className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                  />
                </div>
              )}

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={paymentFormData.isActive}
                    onChange={(e) => setPaymentFormData({ ...paymentFormData, isActive: e.target.checked })}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-600"
                  />
                  <span className="text-white">Active</span>
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-lg transition-colors"
                >
                  {editingPaymentDetail ? 'Update Payment Details' : 'Create Payment Details'}
                </button>
                <button
                  type="button"
                  onClick={resetPaymentForm}
                  className="px-6 bg-red-700 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (showPaymentDetails) {
    return (
      <div className="min-h-screen bg-red-900 relative overflow-hidden py-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-800 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setShowPaymentDetails(false)}
            className="mb-8 text-white hover:text-red-500 font-semibold inline-flex items-center text-lg bg-red-800/60 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Payment Details
            </h1>
            <button
              onClick={() => setShowPaymentForm(true)}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg"
            >
              + Add Payment Details
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {paymentDetails.map((detail) => (
              <div key={detail._id} className="bg-red-800/60 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-red-700/50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      detail.type === 'bank' ? 'bg-red-500' : 
                      detail.type === 'crypto' ? 'bg-red-600' :
                      detail.type === 'cashapp' ? 'bg-green-600' :
                      'bg-blue-600'
                    } text-white`}>
                      {detail.type}
                    </span>
                    {detail.currency && (
                      <span className="ml-2 text-red-500 font-semibold">{detail.currency.toUpperCase()}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditPaymentDetail(detail)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeletePaymentDetail(detail._id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {detail.type === 'bank' && (
                  <div className="space-y-2 text-sm">
                    {detail.accountName && <p><span className="text-gray-100">Account Name:</span> <span className="text-white">{detail.accountName}</span></p>}
                    {detail.accountNumber && <p><span className="text-gray-100">Account Number:</span> <span className="text-white font-mono">{detail.accountNumber}</span></p>}
                    {detail.routingNumber && <p><span className="text-gray-100">Routing Number:</span> <span className="text-white font-mono">{detail.routingNumber}</span></p>}
                    {detail.bankName && <p><span className="text-gray-100">Bank Name:</span> <span className="text-white">{detail.bankName}</span></p>}
                    {detail.swift && <p><span className="text-gray-100">SWIFT:</span> <span className="text-white font-mono">{detail.swift}</span></p>}
                    {detail.iban && <p><span className="text-gray-100">IBAN:</span> <span className="text-white font-mono">{detail.iban}</span></p>}
                  </div>
                )}
                {detail.type === 'crypto' && (
                  <div className="space-y-2 text-sm">
                    {detail.walletAddress && (
                      <div>
                        <p className="text-gray-100 mb-1">Wallet Address:</p>
                        <p className="text-white font-mono break-all">{detail.walletAddress}</p>
                      </div>
                    )}
                    {detail.network && <p><span className="text-gray-100">Network:</span> <span className="text-white">{detail.network}</span></p>}
                  </div>
                )}
                {detail.type === 'cashapp' && (
                  <div className="space-y-2 text-sm">
                    {detail.cashTag && (
                      <div>
                        <p className="text-gray-100 mb-1">CashApp Tag:</p>
                        <p className="text-white font-mono text-lg font-semibold">{detail.cashTag}</p>
                      </div>
                    )}
                  </div>
                )}
                {detail.type === 'paypal' && (
                  <div className="space-y-2 text-sm">
                    {detail.email && (
                      <div>
                        <p className="text-gray-100 mb-1">PayPal Email:</p>
                        <p className="text-white font-mono">{detail.email}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-red-700">
                  <span className={`text-xs ${detail.isActive ? 'text-green-400' : 'text-gray-400'}`}>
                    {detail.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {paymentDetails.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white text-xl mb-4">No payment details yet.</p>
              <button
                onClick={() => setShowPaymentForm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors"
              >
                Create Your First Payment Details
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-red-900 relative overflow-hidden py-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-800 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={resetForm}
            className="mb-8 text-white hover:text-red-500 font-semibold inline-flex items-center text-lg bg-red-800/60 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>

          <div className="bg-red-800/60 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-red-700/50">
            <h1 className="text-3xl font-bold text-white mb-8">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-white"
                >
                  <option value="">Select a category</option>
                  <option value="Emergency Relief">Emergency Relief</option>
                  <option value="Medical Aid">Medical Aid</option>
                  <option value="Community Development">Community Development</option>
                  <option value="Education & Training">Education & Training</option>
                  <option value="Infrastructure Rebuild">Infrastructure Rebuild</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Image URL {!formData.imageUrl && '*'}
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    required={!formData.imageUrl}
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="Enter image URL or upload image"
                    className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                  />
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Or Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(file);
                        }
                      }}
                      className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
                      disabled={uploading}
                    />
                    {uploading && <p className="text-red-500 mt-2">Uploading...</p>}
                  </div>
                  {formData.imageUrl && (
                    <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden border-2 border-red-600">
                      <Image
                        src={formData.imageUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Target Amount (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.targetAmount}
                    onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                    className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Current Amount (USD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.currentAmount}
                    onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                    className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Status *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'completed' })}
                  className="w-full px-4 py-2 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-white"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-lg transition-colors"
                >
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 bg-red-700 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-900 relative overflow-hidden py-12">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-800 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Admin Dashboard
            </h1>
            <p className="text-white text-lg">
              Manage donation projects and view donor information
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowPaymentDetails(true)}
              className="w-full sm:w-auto bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg"
            >
              Payment Details
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg"
            >
              + Create Project
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const progress = calculateProgress(project.currentAmount, project.targetAmount);
            return (
              <div
                key={project._id}
                className="bg-red-800/60 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-red-700/50 group"
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
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDonations(project)}
                      className="flex-1 bg-red-700 hover:bg-red-600 text-white text-center py-2 rounded-lg font-semibold text-sm transition-all"
                    >
                      View Donors
                    </button>
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-lg font-semibold text-sm transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="px-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white text-xl mb-4">No projects yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors"
            >
              Create Your First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

