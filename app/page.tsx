import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Heart,
  Award,
  CheckCircle,
  Globe,
} from "lucide-react";

export default function HomePage() {
  const features = [
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

  const trustIndicators = [
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

  const trustFeatures = [
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
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Community Driven",
      desc: "Built with user feedback",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img
              alt=""
              src="/icon-128x128.png"
              className="h-4 w-4 sm:h-6 sm:w-6 md:w-10 md:h-10 text-white"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-lg font-bold text-gray-900">
                SiteEase
              </span>
              <span className="text-xs text-emerald-600 font-medium hidden sm:block">
                Accessibility First
              </span>
            </div>
          </div>
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-xs sm:text-sm px-3 sm:px-4"
          >
            <a
              href="https://chromewebstore.google.com/detail/site-ease/hhfjlgpooppjdgbnlemkpkjkddfbfpfj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 sm:space-x-0"
            >
              <Chrome className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Add to Chrome</span>
              <span className="sm:hidden">Install</span>
            </a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-24 lg:pt-10 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="flex flex-wrap justify-center gap-2 mb-4 sm:mb-6">
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs sm:text-sm"
            >
              Community Supported
            </Badge>
            <Badge
              variant="secondary"
              className="bg-teal-100 text-teal-800 border-teal-200 text-xs sm:text-sm"
            >
              Research-Based Design
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Empowering Vision
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Beyond Barriers
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto px-4">
            SiteEase is a Chrome extension specifically designed for individuals
            with visual impairments, color vision deficiencies, and reading
            difficulties. Transform any website into an accessible, comfortable
            browsing experience tailored to your unique needs.
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 max-w-3xl mx-auto">
            {trustIndicators.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-1 sm:space-y-2 p-3 sm:p-4 bg-white rounded-lg shadow-sm border"
              >
                <div className="flex items-center space-x-1 sm:space-x-2 text-emerald-600">
                  {stat.icon}
                  <span className="font-bold text-lg sm:text-xl text-gray-900">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md mx-auto">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-6 shadow-lg"
            >
              <a
                href="https://chromewebstore.google.com/detail/site-ease/hhfjlgpooppjdgbnlemkpkjkddfbfpfj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Get Free Access</span>
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-2 mt-4 text-xs sm:text-sm text-gray-500">
            <Chrome className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Chrome Web Store • Free Forever • No Registration</span>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Built with Accessibility Research in Mind
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Developed using established accessibility principles and refined
              through community feedback to ensure effectiveness for real-world
              needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {trustFeatures.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300 text-center"
              >
                <CardHeader className="pb-2 sm:pb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <div className="text-emerald-600">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-base sm:text-lg text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs sm:text-sm text-gray-600">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Comprehensive Visual Accessibility Solutions
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-4">
              Every feature is designed with real users in mind, addressing
              specific challenges faced by individuals with visual impairments
              and reading difficulties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full"
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                    <div className="text-emerald-600">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-gray-900">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 sm:space-y-3">
                    {feature.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-5xl">
          {/* Heading Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              See SiteEase in Action
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4">
              Watch how SiteEase transforms websites to improve accessibility
              for users with visual impairments
            </p>
          </div>

          {/* Video Section */}
          <div className="relative w-full overflow-hidden rounded-xl shadow-xl border border-gray-200 bg-gray-100 aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/iM3bCWWrC98?si=fJjPYC-HjfsUnej9"
              title="YouTube video player"
              frameBorder="0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          {/* Description Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              This demonstration shows how SiteEase adapts websites for
              different visual needs, including color blindness modes and
              dyslexia support features.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Your Vision, Your Web Experience
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-emerald-100 mb-6 sm:mb-8 px-4 leading-relaxed">
            Don't let visual barriers limit your online experience. Join our
            community of users who browse the web with confidence and comfort.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-white text-emerald-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-6 shadow-lg mb-4"
          >
            <a
              href="https://chromewebstore.google.com/detail/site-ease/hhfjlgpooppjdgbnlemkpkjkddfbfpfj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Chrome className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Start Your Accessible Journey</span>
            </a>
          </Button>
          <p className="text-emerald-100 text-xs sm:text-sm">
            Free Forever • Instant Setup • Works on All Websites • Community
            Supported
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
              <img
                alt=""
                src="/icon-128x128.png"
                className="h-4 w-4 sm:h-6 sm:w-6 md:w-10 md:h-10 text-white"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg sm:text-xl font-bold">SiteEase</span>
              <span className="text-xs text-emerald-400">
                Accessibility First
              </span>
            </div>
          </div>
          <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4 px-4">
            Empowering individuals with visual impairments to experience the web
            without barriers.
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            © 2024 SiteEase. Designed with accessibility, built with compassion.
          </p>
        </div>
      </footer>
    </div>
  );
}
