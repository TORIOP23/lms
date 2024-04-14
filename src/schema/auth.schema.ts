import { AddressSchema, UserSchema } from '@/schema/common.schema';
import z from 'zod';

export const RegisterBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    username: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    password_confirmation: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const LoginBody = z
  .object({
    username: z.string(),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 kí tự.').max(100),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = z.object({
  success: z.boolean(),
  data: z.object({
    user: UserSchema,
    token: z.string(),
    csrf_token: z.string(),
  }),
  message: z.string(),
});

export type LoginResType = z.TypeOf<typeof LoginRes>;

export const AuthBody = z.object({
  token: z.string(),
  csrf_token: z.string(),
});

export type AuthBodyType = z.TypeOf<typeof AuthBody>;

export const UpdateUserBody = z.object({
  name: z.string().trim().min(2).max(256),
  dob: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address_id: z.string(),
  image: z.string().optional(),
});

export type UpdateUserBodyType = z.TypeOf<typeof UpdateUserBody>;

export const UserWithoutWordplate = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  email_verified_at: z.string().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  phone: z.string(),
  dob: z.date(),
  username: z.string(),
  address_id: z.string(),
  role_id: z.number(),
  wp_id: z.number(),
  img_id: z.string().nullable(),
  address: AddressSchema,
});

export type UserWithoutWordplateType = z.TypeOf<typeof UserWithoutWordplate>;

export const UpdateUserRes = z.object({
  success: z.boolean(),
  data: UserWithoutWordplate,
  message: z.string(),
});

export type UpdateUserResType = z.TypeOf<typeof UpdateUserRes>;
