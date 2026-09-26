import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PaymentReturn } from "@/components/payment/PaymentReturn";
import { paymentReturnMetadata } from "@/content/payment-return";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return paymentReturnMetadata(locale, "success");
}

export default async function PaymentSuccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PaymentReturn locale={locale} state="success" />;
}
