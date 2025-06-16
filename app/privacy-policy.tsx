import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 text-center">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Last Updated: June 16, 2025
        </p>
        <div className="prose prose-invert max-w-none text-slate-300">
          <p>
            This Privacy Policy describes how Stratifi ("we," "our," or "us")
            collects, uses, and protects data in connection with our services,
            including our website{" "}
            <a
              href="https://stratifi.xyz"
              className="text-blue-400 hover:underline"
            >
              https://stratifi.xyz
            </a>
            , AI Agent, and non-custodial vaults. Stratifi is not a registered
            entity and operates as a decentralized autonomous financial protocol
            on Starknet.
          </p>

          <h2>1. Scope and Nature of Our Services</h2>
          <p>
            Stratifi is a non-custodial, AI-powered liquidity management and
            yield optimization protocol. Users interact with our smart contracts
            and frontend interfaces to deposit assets into yield-generating
            vaults or use our AI Agent to optimize lending and borrowing
            strategies across DeFi protocols. We do not hold custody of user
            assets or store personal identity data unless explicitly provided.
          </p>

          <h2>2. Data We Collect</h2>
          <h3>a. Automatically Collected Data:</h3>
          <ul>
            <li>Public wallet addresses</li>
            <li>Smart contract interaction logs</li>
            <li>
              On-chain activity relevant to deposits, withdrawals, and vault
              usage
            </li>
            <li>Device metadata (IP address, browser type) for analytics</li>
          </ul>
          <h3>b. Voluntarily Provided Data:</h3>
          <ul>
            <li>
              Email addresses submitted via feedback or early access forms
            </li>
            <li>Responses to surveys or support requests</li>
          </ul>

          <h2>3. Use of Data</h2>
          <p>We use collected data to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Power the AI Agent's personalized suggestions</li>
            <li>Analyze vault performance and user activity</li>
            <li>
              Communicate updates (only if email is voluntarily submitted)
            </li>
          </ul>
          <p>
            We <strong>do not</strong>:
          </p>
          <ul>
            <li>Sell or rent personal data</li>
            <li>Collect private keys or access user funds</li>
            <li>Track users across platforms or store cookies unnecessarily</li>
          </ul>

          <h2>4. Use of Cookies</h2>
          <p>We use minimal cookies solely to:</p>
          <ul>
            <li>Maintain session integrity</li>
            <li>Analyze usage patterns for UI improvements</li>
          </ul>
          <p>
            You may disable cookies via your browser settings, though this may
            limit functionality.
          </p>

          <h2>5. AI Agent Data Processing</h2>
          <p>Stratifi's AI Agent operates on:</p>
          <ul>
            <li>
              Wallet-based on-chain data (TVL, APY, collateral ratios, risk
              settings)
            </li>
            <li>
              Natural language instructions for yield or borrow strategies
            </li>
          </ul>
          <p>
            User inputs are processed transiently and are not stored
            persistently. In fully autonomous mode, your strategy is executed
            via smart contracts after one-time wallet approval.
          </p>

          <h2>6. Data Security</h2>
          <p>Stratifi leverages:</p>
          <ul>
            <li>Audited smart contracts</li>
            <li>Non-custodial architecture</li>
            <li>Encrypted connections (HTTPS)</li>
          </ul>
          <p>
            However, blockchain interactions carry inherent risks. Users must
            safeguard their private keys and use Stratifi at their own
            discretion.
          </p>

          <h2>7. Third-Party Integrations</h2>
          <p>
            We integrate with services like AVNU, Fibrous, LayerAkira, and form
            tools (e.g., Typeform). These services may collect anonymized data
            under their own privacy policies.
          </p>

          <h2>8. Your Rights</h2>
          <p>
            If you've submitted your email or other personal information, you
            can request:
          </p>
          <ul>
            <li>Deletion of your data</li>
            <li>Correction of incorrect entries</li>
            <li>Clarification on data use</li>
          </ul>
          <p>
            Contact us at:{" "}
            <a
              href="mailto:info@stratifi.xyz"
              className="text-blue-400 hover:underline"
            >
              info@stratifi.xyz
            </a>
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Stratifi is not intended for users under 18. We do not knowingly
            collect data from minors.
          </p>

          <h2>10. Policy Updates</h2>
          <p>
            This policy may be revised over time. Updates will be posted with a
            new effective date.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any questions or concerns:
            <br />
            📧 Email us at{" "}
            <a
              href="mailto:info@stratifi.xyz"
              className="text-blue-400 hover:underline"
            >
              info@stratifi.xyz
            </a>
            <br />
            🌐 Website:{" "}
            <a
              href="https://stratifi.xyz"
              className="text-blue-400 hover:underline"
            >
              https://stratifi.xyz
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
