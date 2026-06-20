/**
 * Email Logs API Service
 * Handles fetching and caching of email logs with polling support
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetch all email logs with automatic retry
 * @param {Object} options - Fetch options
 * @param {number} options.retries - Number of retry attempts (default: 1)
 * @param {AbortSignal} options.signal - AbortSignal for cancellation
 * @returns {Promise<Array>} Array of email logs
 */
export async function getEmailLogs(options = {}) {
  const { retries = 1, signal = null } = options;
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  let lastError;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${API_BASE}/email-logs/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Ensure data is an array
      if (!Array.isArray(data)) {
        console.warn('Email logs API returned non-array data:', data);
        return [];
      }

      return data;
    } catch (error) {
      lastError = error;
      
      // Don't retry on abort errors
      if (error.name === 'AbortError') {
        throw error;
      }
      
      // Don't retry if this is the last attempt
      if (attempt === retries) {
        throw lastError;
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => 
        setTimeout(resolve, 1000 * Math.pow(2, attempt))
      );
    }
  }

  throw lastError;
}

/**
 * Compute statistics from email logs
 * @param {Array} logs - Array of email logs
 * @returns {Object} Computed statistics
 */
export function computeEmailStats(logs) {
  if (!Array.isArray(logs) || logs.length === 0) {
    return {
      total_sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      failed: 0,
      complaints: 0,
      suppressed: 0,
      open_rate: '0.0',
      click_rate: '0.0',
      bounce_rate: '0.0',
      complaint_rate: '0.0',
    };
  }

  const totalSent = logs.length;
  const delivered = logs.filter(l => l.status === 'delivered').length;
  const opened = logs.filter(l => (l.opens || 0) > 0).length;
  const clicked = logs.filter(l => (l.clicks || 0) > 0).length;
  const bounced = logs.filter(l => l.status === 'bounced').length;
  const failed = logs.filter(l => l.status === 'failed').length;
  const complaints = logs.filter(l => l.status === 'complaint').length;
  const suppressed = logs.filter(l => l.status === 'suppressed').length;

  return {
    total_sent: totalSent,
    delivered,
    opened,
    clicked,
    bounced,
    failed,
    complaints,
    suppressed,
    open_rate: totalSent > 0 ? ((opened / totalSent) * 100).toFixed(1) : '0.0',
    click_rate: totalSent > 0 ? ((clicked / totalSent) * 100).toFixed(1) : '0.0',
    bounce_rate: totalSent > 0 ? ((bounced / totalSent) * 100).toFixed(1) : '0.0',
    complaint_rate: totalSent > 0 ? ((complaints / totalSent) * 100).toFixed(1) : '0.0',
  };
}

/**
 * Filter logs by search query
 * @param {Array} logs - Array of email logs
 * @param {string} query - Search query
 * @returns {Array} Filtered logs
 */
export function filterLogsBySearch(logs, query) {
  if (!query || !query.trim()) return logs;
  
  const lowerQuery = query.toLowerCase();
  return logs.filter(log =>
    log.recipient_name?.toLowerCase().includes(lowerQuery) ||
    log.recipient_email?.toLowerCase().includes(lowerQuery) ||
    log.subject?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Filter logs by status
 * @param {Array} logs - Array of email logs
 * @param {string} status - Status filter ('all' or specific status)
 * @returns {Array} Filtered logs
 */
export function filterLogsByStatus(logs, status) {
  if (status === 'all' || !status) return logs;
  return logs.filter(log => log.status === status);
}

/**
 * Format ISO date string to readable format
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date
 */
export function formatEmailDate(dateStr) {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleString();
  } catch {
    return '—';
  }
}

/**
 * Get status badge styling
 * @param {string} status - Email status
 * @returns {Object} Styling classes
 */
export function getStatusBadgeStyle(status) {
  const styles = {
    'delivered': 'bg-green-100 text-green-700',
    'opened': 'bg-blue-100 text-blue-700',
    'clicked': 'bg-blue-100 text-blue-700',
    'bounced': 'bg-red-100 text-red-600',
    'failed': 'bg-orange-100 text-orange-700',
    'complaint': 'bg-red-200 text-red-800',
    'suppressed': 'bg-gray-200 text-gray-700',
  };
  return styles[status] || 'bg-amber-100 text-amber-700';
}
