import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

type Props = {
  url: string;
  name?: string;
};

const defaultProps: Props = {
  url: "https://cloudbarber.app/reset-password",
};

export default function ResetPasswordEmail({
  url = defaultProps.url,
  name,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>CloudBarber – Passwort zurücksetzen</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={{ marginBottom: 24 }}>
            <Text style={styles.brand}>CloudBarber</Text>
            <Text style={styles.heading}>Passwort zurücksetzen</Text>
          </Section>

          <Text style={styles.text}>Hallo{name ? ` ${name}` : ""},</Text>
          <Text style={styles.text}>
            du hast angefordert, dein Passwort für dein CloudBarber‑Konto
            zurückzusetzen. Klicke auf den folgenden Button, um ein neues
            Passwort festzulegen.
          </Text>

          <Section style={{ textAlign: "center", margin: "24px 0" }}>
            <Button href={url} style={styles.button}>
              Passwort zurücksetzen
            </Button>
          </Section>

          <Text style={styles.textSmall}>
            Klicke auf den folgenden Link, um dein Passwort zurückzusetzen:
          </Text>
          <Section style={{ margin: "12px 0" }}>
            <Link href={url} style={styles.link}>
              {url}
            </Link>
          </Section>

          <Text style={styles.textSmall}>
            Falls der Button oder Link nicht funktioniert, kopiere die Adresse
            und füge sie manuell in die Adresszeile deines Browsers ein.
          </Text>

          <Text style={styles.textSmall}>
            Wenn du diese Anfrage nicht gestellt hast, kannst du diese E‑Mail
            ignorieren.
          </Text>

          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            Mit freundlichen Grüßen
            <br />
            Dein CloudBarber‑Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f8f9fa",
    margin: 0,
    padding: 24,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    color: "#212529",
  },
  container: {
    maxWidth: 560,
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    border: "1px solid #e9ecef",
    padding: 24,
  },
  brand: {
    fontSize: 14,
    color: "#868e96",
    margin: 0,
  },
  heading: {
    fontSize: 22,
    lineHeight: "28px",
    fontWeight: 700,
    margin: "4px 0 0",
    color: "#343a40",
  },
  text: {
    fontSize: 16,
    lineHeight: "24px",
    margin: "12px 0",
  },
  textSmall: {
    fontSize: 14,
    lineHeight: "20px",
    color: "#495057",
    margin: "12px 0",
  },
  button: {
    backgroundColor: "#ff6d48",
    color: "#ffffff",
    padding: "12px 20px",
    borderRadius: 8,
    textDecoration: "none",
    display: "inline-block",
    fontWeight: 600,
  },
  link: {
    color: "#0a3e55",
    wordBreak: "break-all" as const,
    textDecoration: "underline",
    fontSize: 14,
  },
  hr: {
    borderColor: "#e9ecef",
    margin: "24px 0",
  },
  footer: {
    fontSize: 13,
    color: "#868e96",
  },
};
