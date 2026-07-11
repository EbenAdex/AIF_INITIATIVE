import {
  ScholarshipStatus,
  User,
} from '@prisma/client';

export interface ScholarshipDetailsResponse {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  eligibility: string;
  category: string;
  deadline: Date;
  status: ScholarshipStatus;
  maxApplicants: number | null;
  createdAt: Date;
  updatedAt: Date;

  createdBy?: Pick<User, 'id' | 'fullName' | 'email'>;

  applicationCount?: number;
}