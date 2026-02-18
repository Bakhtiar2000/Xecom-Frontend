/**
 * StatsCard Component Usage Examples
 * 
 * A reusable card component for displaying statistics with an icon.
 * Perfect for dashboard metrics, analytics displays, and KPI cards.
 * 
 * Available color variants:
 * - blue, green, purple, orange, red
 * - pink, yellow, indigo, teal, cyan
 */

import { StatsCard } from "./StatsCard";
import { Users, ShoppingCart, DollarSign, TrendingUp, Package, Heart, Star, Zap, Award, Gift } from "lucide-react";

// Example 1: Basic usage with color variants
export function BasicStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Users"
        value={1234}
        icon={Users}
        colorVariant="blue"
      />
      <StatsCard
        title="Total Orders"
        value={856}
        icon={ShoppingCart}
        colorVariant="green"
      />
      <StatsCard
        title="Revenue"
        value={45678}
        icon={DollarSign}
        colorVariant="purple"
      />
      <StatsCard
        title="Growth"
        value={23}
        icon={TrendingUp}
        colorVariant="orange"
      />
    </div>
  );
}

// Example 2: All color variants showcase
export function AllColorVariants() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatsCard title="Blue Variant" value={100} icon={Users} colorVariant="blue" />
      <StatsCard title="Green Variant" value={200} icon={Package} colorVariant="green" />
      <StatsCard title="Purple Variant" value={300} icon={Star} colorVariant="purple" />
      <StatsCard title="Orange Variant" value={400} icon={TrendingUp} colorVariant="orange" />
      <StatsCard title="Red Variant" value={500} icon={Zap} colorVariant="red" />
      <StatsCard title="Pink Variant" value={600} icon={Heart} colorVariant="pink" />
      <StatsCard title="Yellow Variant" value={700} icon={Award} colorVariant="yellow" />
      <StatsCard title="Indigo Variant" value={800} icon={Gift} colorVariant="indigo" />
      <StatsCard title="Teal Variant" value={900} icon={ShoppingCart} colorVariant="teal" />
      <StatsCard title="Cyan Variant" value={1000} icon={DollarSign} colorVariant="cyan" />
    </div>
  );
}

// Example 3: Loading state
export function LoadingStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard
        title="Total Users"
        value={0}
        icon={Users}
        colorVariant="blue"
        isLoading={true}
      />
      <StatsCard
        title="Active Users"
        value={0}
        icon={Users}
        colorVariant="green"
        isLoading={true}
      />
      <StatsCard
        title="Pending Orders"
        value={0}
        icon={ShoppingCart}
        colorVariant="orange"
        isLoading={true}
      />
      <StatsCard
        title="Revenue"
        value={0}
        icon={DollarSign}
        colorVariant="purple"
        isLoading={true}
      />
    </div>
  );
}

// Example 4: Error state
export function ErrorStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard
        title="Failed to load Total Users"
        value={0}
        icon={Users}
        colorVariant="blue"
        isError={true}
      />
      <StatsCard
        title="Failed to load Active Users"
        value={0}
        icon={Users}
        colorVariant="green"
        isError={true}
      />
      <StatsCard
        title="Failed to load Orders"
        value={0}
        icon={ShoppingCart}
        colorVariant="orange"
        isError={true}
      />
      <StatsCard
        title="Failed to load Revenue"
        value={0}
        icon={DollarSign}
        colorVariant="purple"
        isError={true}
      />
    </div>
  );
}

// Example 5: Dynamic data with conditional loading and error
export function DynamicStatsCards({ isLoading, isError, data }: { isLoading: boolean; isError: boolean; data?: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard
        title="Total Users"
        value={data?.totalUsers ?? 0}
        icon={Users}
        colorVariant="blue"
        isLoading={isLoading}
        isError={isError}
      />
      <StatsCard
        title="Active Sessions"
        value={data?.activeSessions ?? 0}
        icon={Zap}
        colorVariant="green"
        isLoading={isLoading}
        isError={isError}
      />
      <StatsCard
        title="Total Revenue"
        value={data?.revenue ?? 0}
        icon={DollarSign}
        colorVariant="purple"
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

// Example 6: Color variant selection guide
export const ColorVariantGuide = {
  // Status indicators
  success: "green",     // For positive metrics, completed items
  warning: "orange",    // For warnings, pending items
  danger: "red",        // For errors, critical metrics
  info: "blue",         // For general information

  // Feature categories
  users: "blue",        // User-related metrics
  orders: "green",      // Order completion, success
  revenue: "purple",    // Financial metrics
  growth: "teal",       // Growth metrics
  engagement: "pink",   // User engagement, likes
  performance: "cyan",  // Performance metrics
  alerts: "yellow",     // Notifications, alerts
  premium: "indigo",    // Premium features, VIP
};
