interface UserCredentials {
  email: string | null;
  type: boolean;
  number: string | null;
}

export interface EmailVerificationFormProps {
  userCredentials: Partial<UserCredentials>;
  verifyType: VerifyType;
}
