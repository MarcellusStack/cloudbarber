import { logger, task } from "@trigger.dev/sdk";
import { Resend } from "resend";
import EmailVerificationEmail from "@/emails/email-verification";

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailVerificationTask = task({
  id: "email-verification",
  // Set an optional maxDuration to prevent tasks from running indefinitely
  maxDuration: 300, // Stop executing after 300 secs (5 mins) of compute
  run: async (payload: { email: string; url: string }, { ctx }) => {
    try {
      logger.log("Sending email using React.email and Resend", {
        payload,
      });

      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: payload.email,
        subject: "Verify your email address",
        react: <EmailVerificationEmail url={payload.url} />,
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
