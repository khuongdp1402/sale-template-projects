/**
 * Feature flags for the admin application.
 * Allows enabling/disabling complex modules during development.
 */
export const FEATURES = {
  enableDeployActions: true,
  enablePayments: true,
  enableMonitoring: true,
  enableSystemLogs: true,
  enableFeatureDrafts: true,
} as const;
