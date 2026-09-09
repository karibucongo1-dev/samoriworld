import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/site-config';
import AffiliateCTA from '@/components/AffiliateCTA';

export const metadata: Metadata = {
  title: 'Top 5 Fast VPNs for UK Streaming & Security',
  description:
    'Five VPN services compared on UK monthly pricing, server locations, encryption, and money-back guarantee length.',
  alternates: {
    canonical: absoluteUrl('/guides/best-vpn-uk/'),
  },
};

// Illustrative figures — confirm current pricing/terms on each provider's site before publishing.
const vpns = [
  { name: 'NordVPN', priceGBP: 3.99, servers: '60+ countries', encryption: 'AES-256', guaranteeDays: 30 },
  { name: 'ExpressVPN', priceGBP: 5.99, servers: '105 countries', encryption: 'AES-256', guaranteeDays: 30 },
  { name: 'Surfshark', priceGBP: 2.19, servers: '100 countries', encryption: 'AES-256', guaranteeDays: 30 },
  { name: 'ProtonVPN', priceGBP: 3.99, servers: '90+ countries', encryption: 'AES-256', guaranteeDays: 30 },
  { name: 'CyberGhost', priceGBP: 2.19, servers: '100 countries', encryption: 'AES-256', guaranteeDays: 45 },
];

export default function VpnGuidePage() {
  return (
    <main>
      <h1>Top 5 Fast VPNs for UK Streaming & Security</h1>

      <p>
        For UK streaming and everyday privacy, Surfshark and CyberGhost offer the lowest monthly
        cost with a full 100-country server list, while ExpressVPN remains the fastest option for
        anyone prioritizing speed over price.
      </p>

      <table>
        <caption>Comparison: pricing, servers, encryption, and guarantee</caption>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Monthly price (£)</th>
            <th>Server locations</th>
            <th>Encryption</th>
            <th>Money-back guarantee</th>
          </tr>
        </thead>
        <tbody>
          {vpns.map((v) => (
            <tr key={v.name}>
              <td>{v.name}</td>
              <td>£{v.priceGBP.toFixed(2)}</td>
              <td>{v.servers}</td>
              <td>{v.encryption}</td>
              <td>{v.guaranteeDays} days</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section aria-labelledby="ctas-heading">
        <h2 id="ctas-heading">Where to sign up</h2>
        <ul>
          {vpns.map((v) => (
            <li key={v.name}>
              <AffiliateCTA href="https://example-affiliate-network.com/REPLACE_WITH_LINK">
                {v.name} — view plans
              </AffiliateCTA>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="legal-heading">
        <h2 id="legal-heading">Is it legal to use a VPN in the UK?</h2>
        <p>
          Yes. Using a VPN is legal in the UK. It's the same as using any other privacy tool —
          what remains illegal is using a VPN to carry out otherwise-illegal activity, such as
          accessing pirated content or committing fraud.
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': vpns.map((v) => ({
              '@type': 'SoftwareApplication',
              name: v.name,
              applicationCategory: 'SecurityApplication',
              offers: {
                '@type': 'Offer',
                priceCurrency: 'GBP',
                price: v.priceGBP,
              },
            })),
          }),
        }}
      />
    </main>
  );
}
