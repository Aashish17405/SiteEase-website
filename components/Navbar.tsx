"use client";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import { useRouter } from "next/navigation";
import { OptimizedImage } from "./OptimizedImage";
export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-2 flex items-center justify-between">
        <button
          className="flex items-center space-x-2 sm:space-x-3"
          onClick={() => router.push("/")}
        >
          <OptimizedImage
            alt="SiteEase Logo"
            src="/icon-128x128.png"
            width={40}
            height={40}
            className="h-4 w-4 sm:h-6 sm:w-6 md:w-10 md:h-10 text-white"
            priority={true}
          />
          <div className="flex flex-col">
            <span className="text-lg sm:text-lg font-bold text-gray-900">
              SiteEase
            </span>
            <span className="text-xs text-emerald-600 font-medium hidden sm:block">
              Accessibility First
            </span>
          </div>
        </button>
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
    </nav>
  );
}
