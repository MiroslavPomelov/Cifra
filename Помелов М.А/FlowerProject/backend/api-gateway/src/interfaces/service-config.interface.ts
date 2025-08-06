export interface ServiceConfig {
  name: string;
  internalUrl: string;
  externalUrl?: string;
  port: number;
  requiresAuth: boolean;
}

export interface ServiceRegistry {
  [key: string]: ServiceConfig;
} 