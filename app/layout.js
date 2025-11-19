import './globals.css'

export const metadata = {
  title: 'ChemLab Templates | Professional Laboratory Template Manager',
  description: 'Create professional chemistry laboratory documentation with 20+ templates including reaction planning, safety assessments, equipment logs, and more. Free templates for chemists, researchers, and lab technicians.',
  keywords: 'chemistry templates, lab notebook, laboratory forms, reaction planning, safety assessment, equipment log, chemical inventory, research templates, lab documentation, NMR, HPLC, chromatography, purification log, compound inventory, reagent tracking',
  authors: [{ name: 'ChemLab Templates' }],
  creator: 'ChemLab Templates',
  publisher: 'ChemLab Templates',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'ChemLab Templates | Professional Laboratory Template Manager',
    description: 'Professional chemistry lab templates for researchers and technicians. 20+ templates for reaction planning, safety, equipment tracking, and more.',
    type: 'website',
    locale: 'en_US',
    url: 'https://chemlab-templates.netlify.app',
    siteName: 'ChemLab Templates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChemLab Templates | Professional Laboratory Template Manager',
    description: 'Professional chemistry lab templates for researchers and technicians',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code-here',
  },
  category: 'technology',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://chemlab-templates.netlify.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'ChemLab Templates',
              description: 'Professional laboratory template management system for chemistry researchers',
              url: 'https://chemlab-templates.netlify.app',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'Reaction Planning Templates',
                'Safety Assessment Forms',
                'Equipment Maintenance Logs',
                'Compound Inventory Management',
                'Print and PDF Export',
                'Mobile Responsive Design'
              ],
              browserRequirements: 'Requires JavaScript. Requires HTML5.',
              softwareVersion: '1.0',
              author: {
                '@type': 'Organization',
                name: 'ChemLab Templates',
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}