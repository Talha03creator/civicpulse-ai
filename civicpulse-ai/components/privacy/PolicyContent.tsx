import React from "react";

export function PolicyContent() {
  return (
    <article className="prose prose-slate prose-headings:font-heading prose-headings:font-bold prose-h1:text-4xl prose-a:text-primary hover:prose-a:text-primary-dark max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-text-secondary mb-8">
        <strong>Last Updated:</strong> {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <h2>1. Introduction & Scope</h2>
      <p>
        At CivicPulse AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our civic infrastructure reporting platform. This policy applies to all users (citizens) submitting reports and to the municipal departments receiving them.
      </p>

      <h2>2. What Data We Collect</h2>
      <p>
        To effectively route your maintenance reports, we collect the following data:
      </p>
      <ul>
        <li><strong>Media:</strong> The photos and/or videos you upload demonstrating the infrastructure issue.</li>
        <li><strong>Location Data:</strong> The GPS coordinates or manually entered address of the issue to ensure precise routing.</li>
        <li><strong>Contact Information:</strong> Your name and email address (if provided) to send you automated updates regarding the status of your report.</li>
      </ul>

      <h2>3. How AI Processing Works</h2>
      <p>
        We utilize state-of-the-art multimodal artificial intelligence to classify and prioritize incoming reports.
      </p>
      <p>
        <strong>Third-Party AI Processing:</strong> The photos and videos you submit are securely transmitted to Fireworks AI, our trusted third-party AI processor, which runs the Gemma 4 model. The AI analyzes the visual data strictly to determine the category (e.g., pothole, streetlight) and severity of the issue. Fireworks AI does not retain this data for training its foundation models.
      </p>

      <h2>4. How Your Data is Used</h2>
      <p>
        We use your data solely for the purpose of civic maintenance:
      </p>
      <ul>
        <li><strong>Routing:</strong> To automatically dispatch the ticket to the correct municipal department (e.g., Water, Roads, Electrical).</li>
        <li><strong>Updates:</strong> To notify you when the issue&apos;s status changes (e.g., &quot;Received&quot;, &quot;In Progress&quot;, &quot;Resolved&quot;).</li>
        <li><strong>Aggregate Analytics:</strong> We provide municipalities with anonymized, aggregated data (e.g., &quot;50 potholes reported in District 4 this month&quot;) to help them improve city planning.</li>
      </ul>

      <h2>5. Data Retention & Deletion Rights</h2>
      <p>
        We retain your personal contact information only for as long as necessary to resolve the reported issue and for a brief audit period thereafter. The photos and generalized location data may be retained indefinitely as part of the municipality&apos;s public record of resolved issues.
      </p>
      <p>
        You have the right to request the deletion of your personal contact information at any time. To exercise this right, please contact us using the information provided below.
      </p>

      <h2>6. Third-Party Sharing</h2>
      <p>
        We do not sell your personal data to advertisers or data brokers. Your report data (including media, location, and contact info) is shared <strong>only</strong> with the specific municipal departments or institutional maintenance teams responsible for resolving the issue.
      </p>

      <h2>7. Security Measures</h2>
      <p>
        We implement robust, industry-standard security measures to protect your data during transmission and at rest. All data transfers are encrypted, and our infrastructure is hosted on secure, compliant cloud environments.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy or our data practices, please contact our Privacy Team:
      </p>
      <p>
        <strong>Email:</strong> privacy@civicpulse.ai<br />
        <strong>Address:</strong> CivicPulse AI Privacy Office, [City, State, Zip]
      </p>
    </article>
  );
}
