import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn signUpUrl="/de/sign-up" />;
}
