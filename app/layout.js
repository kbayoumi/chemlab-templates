export const metadata = {
  title: 'ChemLab Templates | Professional Laboratory Template Manager',
  description: 'Create professional chemistry laboratory documentation with 20+ templates including reaction planning, safety assessments, equipment logs, and more. Free templates for chemists, researchers, and lab technicians.',
  keywords: 'chemistry templates, lab notebook, laboratory forms, reaction planning, safety assessment, equipment log, chemical inventory, research templates, lab documentation',
  authors: [{ name: 'ChemLab Templates' }],
  openGraph: {
    title: 'ChemLab Templates | Professional Laboratory Template Manager',
    description: 'Professional chemistry lab templates for researchers and technicians',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://your-domain.netlify.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}