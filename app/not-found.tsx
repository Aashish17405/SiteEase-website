import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/OptimizedImage";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4">
      <div className="flex flex-col items-center space-y-6 max-w-md w-full">
        <div className="w-20 h-20 mb-2">
          <OptimizedImage
            src="/icon-128x128.png"
            alt="SiteEase Logo"
            width={80}
            height={80}
            priority={true}
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-center text-base sm:text-lg">
          Oops! The page you are looking for does not exist or has been moved.
          <br />
          Please check the URL or return to the homepage.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3"
        >
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
