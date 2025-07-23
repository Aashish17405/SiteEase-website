import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Static data for HomePage (moved from app/page.tsx)
import {
  Eye,
  Type,
  Palette,
  ToggleLeft,
  Zap,
  Shield,
  Download,
  Chrome,
  Star,
  Users,
  Award,
  CheckCircle,
  Globe,
} from "lucide-react";

export const features = [
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Color Vision Support",
    description:
      "Comprehensive assistance for all types of color vision deficiencies, ensuring no one is left behind.",
    items: [
      "Protanopia (Red-blind) Support",
      "Deuteranopia (Green-blind) Support",
      "Tritanopia (Blue-blind) Support",
      "Tritanomaly (Yellow-blind) Support",
      "Achromatopsia (Complete color blindness)",
    ],
  },
  {
    icon: <Type className="h-6 w-6" />, 
    title: "Dyslexia Assistance",
    description:
      "Scientifically-backed features to improve reading comprehension and reduce visual stress for dyslexic users.",
    items: [
      "OpenDyslexic Font Integration",
      "Optimized Letter Spacing",
      "Enhanced Word Spacing",
      "Reading Flow Improvement",
    ],
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Visual Enhancement",
    description:
      "Advanced contrast and clarity adjustments to reduce eye strain and improve text readability.",
    items: [
      "High Contrast Mode",
      "Text Clarity Enhancement",
      "Background Optimization",
      "Glare Reduction",
    ],
  },
  {
    icon: <ToggleLeft className="h-6 w-6" />,
    title: "Intuitive Controls",
    description:
      "Designed with accessibility in mind - easy-to-use controls that work for everyone.",
    items: [
      "One-Click Activation",
      "Visual Status Indicators",
      "Persistent Preferences",
      "Accessible Interface",
    ],
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Instant Relief",
    description:
      "Immediate improvements without page reloads - see the difference the moment you need it.",
    items: [
      "Real-Time Processing",
      "Instant Visual Changes",
      "Smart Element Detection",
      "Seamless Experience",
    ],
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Complete Coverage",
    description:
      "Works across all website elements to ensure consistent accessibility throughout your browsing experience.",
    items: [
      "Text & Headings",
      "Images & Graphics",
      "Navigation Elements",
      "Interactive Components",
    ],
  },
];

export const trustIndicators = [
  {
    icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />,
    label: "Growing Community",
    value: "Users",
  },
  {
    icon: <Star className="h-4 w-4 sm:h-5 sm:w-5" />,
    label: "Positive Reviews",
    value: "★★★★★",
  },
  {
    icon: <Download className="h-4 w-4 sm:h-5 sm:w-5" />,
    label: "Easy Installation",
    value: "1-Click",
  },
  {
    icon: <Globe className="h-4 w-4 sm:h-5 sm:w-5" />,
    label: "Universal Support",
    value: "All Sites",
  },
];

export const trustFeatures = [
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Privacy Protected",
    desc: "Zero data collection",
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: "Research-Based",
    desc: "Built on accessibility research",
  },
  {
    icon: <CheckCircle className="h-5 w-5" />,
    title: "User Tested",
    desc: "Refined through community feedback",
  },
];
