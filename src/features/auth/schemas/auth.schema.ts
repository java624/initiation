import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'validation.required')
    .email('validation.invalidEmail'),
  password: z
    .string()
    .min(1, 'validation.required')
    .min(6, 'validation.minPassword'),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const userRoleSchema = z.enum(['student', 'teacher', 'admin']);
export type UserRoleInput = z.infer<typeof userRoleSchema>;

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, 'validation.required')
      .min(2, 'validation.minName'),
    email: z
      .string()
      .min(1, 'validation.required')
      .email('validation.invalidEmail'),
    role: userRoleSchema.default('student'),
    password: z
      .string()
      .min(1, 'validation.required')
      .min(6, 'validation.minPassword'),
    confirmPassword: z
      .string()
      .min(1, 'validation.required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'validation.passwordsMustMatch',
    path: ['confirmPassword'],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'validation.required')
    .email('validation.invalidEmail'),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
