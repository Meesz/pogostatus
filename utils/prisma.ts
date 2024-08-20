import { PrismaClient } from "@prisma/client";

// Define a global variable to store the PrismaClient instance
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Export a singleton instance of PrismaClient
// If the global variable already has a PrismaClient instance, use it
// Otherwise, create a new PrismaClient instance with query logging enabled
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

// In development mode, store the PrismaClient instance in the global variable
// This ensures that the same instance is reused across hot-reloads
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
