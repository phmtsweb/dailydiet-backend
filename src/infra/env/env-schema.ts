import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  HOST: z.string().ip({ version: 'v4' }).default('0.0.0.0'),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  DATABASE_URL: z.string(),
})

export type Env = z.infer<typeof envSchema>
