export const generateEmailConfirmationLink = (token: string): string => {
  const clientURL = process.env.CLIENT_URL;
  return `${clientURL}/activate-mail/${token}`;
}
