import { Injectable } from '@nestjs/common';
import { ServiceConfig, ServiceRegistry } from '../interfaces/service-config.interface';

@Injectable()
export class ServiceConfigService {
  private readonly serviceRegistry: ServiceRegistry = {
    users: {
      name: 'users-service',
      internalUrl: 'http://users-service:3000',
      externalUrl: 'http://localhost:80',
      port: 3001,
      requiresAuth: true,
    },
    auth: {
      name: 'auth-service',
      internalUrl: 'http://auth-service:3000',
      externalUrl: 'http://localhost:80',
      port: 3002,
      requiresAuth: false,
    },
    shops: {
      name: 'shop-service',
      internalUrl: 'http://shop-service:3000',
      externalUrl: 'http://localhost:80',
      port: 3003,
      requiresAuth: false, 
    },
    products: {
      name: 'product-service',
      internalUrl: 'http://product-service:3000',
      externalUrl: 'http://localhost:80',
      port: 3004,
      requiresAuth: false, 
    },
    payment: {
      name: 'payment-service',
      internalUrl: 'http://payment-service:3000',
      externalUrl: 'http://localhost:80',
      port: 3005,
      requiresAuth: false,
    },
    order: {
      name: 'order-service',
      internalUrl: 'http://order-service:3000',
      externalUrl: 'http://localhost:80',
      port: 3006,
      requiresAuth: true,
    },
  };

  getServiceConfig(serviceName: string): ServiceConfig | null {
    return this.serviceRegistry[serviceName] || null;
  }

  getAllServices(): ServiceRegistry {
    return this.serviceRegistry;
  }

  getInternalUrl(serviceName: string): string | null {
    const config = this.getServiceConfig(serviceName);
    return config ? config.internalUrl : null;
  }

  getExternalUrl(serviceName: string): string | null {
    const config = this.getServiceConfig(serviceName);
    return config ? config.externalUrl : null;
  }

  requiresAuth(serviceName: string): boolean {
    const config = this.getServiceConfig(serviceName);
    return config ? config.requiresAuth : false;
  }
} 