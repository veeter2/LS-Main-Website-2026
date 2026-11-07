import { LegalPage, type LegalSection } from '../_components/legal';

const SECTIONS: LegalSection[] = [
  {
    title: 'The One-to-One Relationship',
    body: 'The very nature of LongStrider is a one-to-one relationship between you and your intelligence layer. This architectural design ensures that your instance exists solely for your organization, all data remains private to your deployment, nothing is shared or aggregated across customers, and your relationship with your intelligence layer, owned by you, is completely isolated and secure.',
  },
  {
    title: 'Zero Access Architecture',
    lead: 'We do not store, access, review, or have any ability to access your data.',
    items: [
      { label: 'On-Premises Deployments', text: 'All data remains on your infrastructure. We have zero access to your conversations, institutional memory, or any information processed by your LongStrider instance.' },
      { label: 'Hosted Intelligence', text: 'Your data is stored in isolated, dedicated instances. Our infrastructure team cannot access the contents of your data.' },
      { label: 'Owned Build', text: 'You maintain complete ownership of your data and the compiled intelligence layer. No telemetry to us.' },
    ],
  },
  {
    title: 'What We Collect',
    body: 'To provide our service, we collect minimal information necessary for account management and deployment coordination: email address for account communication, payment information (processed through third-party payment processors), and license and service status.',
    note: 'We do not collect the content of your interactions, institutional memory, documents, or any information processed within your LongStrider environment.',
  },
  {
    title: 'Changes to This Policy',
    body: 'We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of material changes by posting the updated policy on our website and emailing your registered address. Continued use of LongStrider after changes constitutes acceptance of the updated policy.',
  },
  {
    title: 'Contact',
    body: null,
    contact: { email: 'privacy@longstrider.ai', label: 'Privacy inquiries' },
  },
];

const STRIP = [
  { label: 'Your Data', body: 'Belongs to you and you alone. We never claim rights to your content.' },
  { label: 'One-to-One', body: 'Your instance serves you exclusively. No data sharing across customers.' },
  { label: 'Zero Access', body: 'We cannot access your conversations, memory, or processed data.' },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 7, 2026"
      intro="Your data belongs to you. That isn’t a policy statement. It’s the architectural premise of everything we build."
      strip={STRIP}
      sections={SECTIONS}
    />
  );
}
