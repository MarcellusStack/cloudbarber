import { logger, task } from "@trigger.dev/sdk";
import { Resend } from "resend";
import ResetPasswordEmail from "@/emails/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY);

export const resetPasswordTask = task({
  id: "reset-password",
  // Set an optional maxDuration to prevent tasks from running indefinitely
  maxDuration: 300, // Stop executing after 300 secs (5 mins) of compute
  run: async (
    payload: { email: string; url: string; name: string },
    { ctx }
  ) => {
    try {
      logger.log("Sending email using React.email and Resend", {
        payload,
      });

      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: payload.email,
        subject: "Passwort zurücksetzen für CloudBarber",
        react: <ResetPasswordEmail url={payload.url} name={payload.name} />,
      });

      if (error) {
        logger.error("Failed to send email", { error });
        throw new Error(`Failed to send email: ${error.message}`);
      }

      logger.info("Email sent successfully", { emailId: data?.id });

      // Return the response from Resend
      return {
        id: data?.id,
        status: "sent",
      };
    } catch (error) {
      logger.error("Failed to send email", { error });
      throw error;
    }
  },
});
