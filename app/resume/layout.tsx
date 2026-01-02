import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Resume - Jeevanantham Mahalingam",
  description: "Request the resume of Jeevanantham Mahalingam. Get verified access to my professional experience and skills.",
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
