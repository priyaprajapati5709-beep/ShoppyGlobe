/**
 * formatPrice
 * Formats a numeric value as a USD currency string, such as $1,234.50.
 * Keeping this logic in one place ensures pricing is displayed consistently
 * across the catalog, the cart, and checkout.
 *
 * @param {number} value - raw numeric price
 * @returns {string} formatted currency string
 */
export function formatPrice(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return '$0.00';
  return num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * calculateDiscountedPrice
 * Applies the product discount percentage and returns the adjusted unit price.
 */
export function calculateDiscountedPrice(price, discountPercentage = 0) {
  const num = Number(price) || 0;
  const discount = Number(discountPercentage) || 0;
  return num - (num * discount) / 100;
}

/**
 * generateOrderId
 * Produces a human-friendly order reference, e.g. "SG-7F3K9D2A".
 * Used on the Checkout success screen — purely cosmetic/demo, not a
 * real backend order id since this is a dummy checkout flow.
 */
export function generateOrderId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SG-${stamp}${rand}`;
}
