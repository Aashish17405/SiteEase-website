import React from "react";
import Image from "next/image";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="privacy-content max-w-4xl mx-auto">
          <div className="header-section mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">SiteEase Chrome Extension</p>
          </div>

          <div className="last-updated mb-6">
            <p className="text-base text-gray-600">
              <strong>Last Updated:</strong> June 2025
            </p>
          </div>

          <div className="intro-section mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              At SiteEase, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, and protect your information when
              you use our Chrome extension. We believe in transparency and want
              you to understand exactly how your data is handled. Our extension
              is designed with privacy in mind, storing all data locally in your
              browser and never transmitting it to external servers.
            </p>
          </div>

          <div className="content-section mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              SiteEase collects minimal data to provide its accessibility
              features. We only collect what is necessary to make your
              experience better:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
              <li>
                <strong>Accessibility Preferences:</strong> Your chosen settings
                for color blindness filters (Protanopia, Deuteranopia,
                Tritanopia, Tritanomaly, Achromatopsia) and dyslexia support
              </li>
              <li>
                <strong>Feature States:</strong> Which accessibility features
                are currently enabled or disabled
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              <strong>We do not collect:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
              <li>Personal information or identification data</li>
              <li>Browsing history or website content</li>
              <li>IP addresses or location data</li>
              <li>Any data that could be used to identify you</li>
            </ul>
          </div>

          <div className="content-section mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The data we collect is used solely to enhance your accessibility
              experience:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
              <li>
                <strong>Persistent Settings:</strong> Remember your
                accessibility preferences across browser sessions and tabs
              </li>
              <li>
                <strong>Real-time Adjustments:</strong> Apply color filters and
                dyslexia-friendly fonts to web pages you visit
              </li>
              <li>
                <strong>Feature Management:</strong> Ensure only one color
                filter is active at a time while allowing dyslexia support to
                work alongside any filter
              </li>
              <li>
                <strong>Performance Optimization:</strong> Maintain smooth
                operation of the extension's features
              </li>
            </ul>
          </div>

          <div className="content-section mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Information Sharing and Disclosure
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>We do not share your data with any third parties.</strong>
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Your preferences are stored locally in your browser using Chrome's
              secure storage API (chrome.storage.sync). This data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700 mt-4">
              <li>Never leaves your device</li>
              <li>Is not transmitted to any external servers</li>
              <li>Is not accessible to other extensions or websites</li>
              <li>Is automatically cleared when you uninstall the extension</li>
            </ul>
          </div>

          <div className="content-section mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Data Security
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We implement several security measures to protect your
              information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
              <li>
                <strong>Local Storage:</strong> All data is stored locally in
                your browser using Chrome's secure storage API
              </li>
              <li>
                <strong>No External Communication:</strong> The extension does
                not make any network requests or transmit data
              </li>
              <li>
                <strong>Minimal Permissions:</strong> We only request the
                necessary permissions (storage and activeTab) to function
              </li>
              <li>
                <strong>Content Security Policy:</strong> Strict CSP
                implementation to prevent unauthorized script execution
              </li>
              <li>
                <strong>Regular Updates:</strong> Continuous security
                maintenance and updates through the Chrome Web Store
              </li>
            </ul>
          </div>

          <div className="content-section mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Contact Information
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at:
            </p>
            <p className="text-lg text-gray-700">
              Email:
              <a
                href="mailto:aashish17405@gmail.com"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                aashish17405@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
