import { OptimizedImage } from "@/components/OptimizedImage";

export default function Footer() {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
            <OptimizedImage
              alt="SiteEase Logo"
              src="/icon-128x128.png"
              width={40}
              height={40}
              className="h-4 w-4 sm:h-6 sm:w-6 md:w-10 md:h-10 text-white"
              priority={true}
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
        <a
          href="/privacy-policy"
          className="text-xs sm:text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-200 underline"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
