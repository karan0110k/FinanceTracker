export const mockCategoryData = [
  { name: 'Food & Dining', amount: 450.75, percentage: 30, color: '#3B82F6' },
  { name: 'Transportation', amount: 220.50, percentage: 15, color: '#10B981' },
  { name: 'Bills & Utilities', amount: 300.00, percentage: 20, color: '#F59E0B' },
  { name: 'Shopping', amount: 180.25, percentage: 12, color: '#8B5CF6' },
  { name: 'Entertainment', amount: 150.00, percentage: 10, color: '#EF4444' },
  { name: 'Other', amount: 200.00, percentage: 13, color: '#6B7280' },
];

export const mockMonthlyData = [
  { month: 'Jan', amount: 1200, budget: 1500 },
  { month: 'Feb', amount: 1350, budget: 1500 },
  { month: 'Mar', amount: 1400, budget: 1600 },
  { month: 'Apr', amount: 1100, budget: 1600 },
  { month: 'May', amount: 1550, budget: 1700 },
  { month: 'Jun', amount: 1480, budget: 1700 },
];

export const totalExpenses = mockMonthlyData.reduce((sum, month) => sum + month.amount, 0);