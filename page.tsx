"use client" // This component needs to be a Client Component to use useState and handle button clicks

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Users, Clock, ShieldCheck } from "lucide-react"
import BookingForm from "@/components/booking-form"
import AuthDialog from "@/components/auth-dialog" // Import AuthDialog as a default export
import { useState, useEffect } from "react" // Import useState and useEffect

export default function Component() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false) // State to manage dialog visibility

  useEffect(() => {
    console.log("App page component rendered!")
  }, [])

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black shadow-md px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2 font-bold text-lg text-white">
          <Image
            src="/images/saravana_travels_logo.png"
            alt="Saravana Travels Logo"
            width={150}
            height={40}
            className="h-10 w-auto"
            priority // Prioritize loading for logo
          />
          <span className="text-xl font-extrabold tracking-tight text-white">Saravana Travels</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="#home"
            className="text-sm font-medium text-white hover:text-[var(--hertz-yellow)] transition-colors"
          >
            Home
          </Link>
          <Link
            href="#services"
            className="text-sm font-medium text-white hover:text-[var(--hertz-yellow)] transition-colors"
          >
            Services
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-white hover:text-[var(--hertz-yellow)] transition-colors"
          >
            About Us
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-white hover:text-[var(--hertz-yellow)] transition-colors"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-gray-800 hover:text-[var(--hertz-yellow)]"
            onClick={() => setIsAuthDialogOpen(true)} // Open the dialog on click
          >
            Login / Sign up
          </Button>
          {/* Mobile menu icon - placeholder, full functionality not implemented */}
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 mt-16">
        {/* Hero Section */}
        <section
          id="home"
          className="relative h-[700px] flex items-center justify-start text-left overflow-hidden bg-cover bg-center text-white"
          // Removed inline style for background image
        >
          {/* Main hero image with overlay */}
          <Image
            src="/images/hero-bg-main.png"
            alt="People interacting with a car at a dealership"
            fill
            style={{ objectFit: "cover" }}
            className="absolute inset-0 z-0 brightness-[0.6]" // Added brightness for text readability
            priority
          />
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[var(--hertz-yellow)] z-10 hidden md:block" />

          {/* Content (Title, Subtitle) */}
          <div className="relative z-20 space-y-4 px-4 md:px-12 w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter drop-shadow-lg">
              The Malaysia Leading Car Rental Company
            </h1>
            <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">Welcome to Hertz Malaysia</p>
          </div>

          {/* Booking Form - positioned to overlap */}
          <div className="absolute z-30 bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl">
            <BookingForm />
          </div>
        </section>

        {/* Services Offered Section */}
        <section
          id="services"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 relative overflow-hidden"
          style={{
            backgroundImage: `url('/images/services-bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gray-900/70 z-0" />
          <div className="container px-4 md:px-6 text-center relative z-10 text-white animate-fade-in animate-delay-100">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-12">Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center p-6 bg-white/15 backdrop-blur-sm rounded-lg shadow-xl border border-yellow-500/50 hover:scale-105 transition-transform duration-300 animate-slide-in-up animate-delay-200">
                <Image
                  src="/images/three-wheeler.png"
                  alt="Three Wheeler"
                  width={200}
                  height={150}
                  className="rounded-md mb-4 object-cover h-32 w-full"
                />
                <h3 className="text-xl font-semibold mb-2">Three Wheeler</h3>
                <p className="text-gray-200">Convenient and quick rides for short distances.</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/15 backdrop-blur-sm rounded-lg shadow-xl border border-yellow-500/50 hover:scale-105 transition-transform duration-300 animate-slide-in-up animate-delay-300">
                <Image
                  src="/images/van.png"
                  alt="Van"
                  width={200}
                  height={150}
                  className="rounded-md mb-4 object-cover h-32 w-full"
                />
                <h3 className="text-xl font-semibold mb-2">Van</h3>
                <p className="text-gray-200">Spacious and comfortable for family trips or group travel.</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/15 backdrop-blur-sm rounded-lg shadow-xl border border-yellow-500/50 hover:scale-105 transition-transform duration-300 animate-slide-in-up animate-delay-400">
                <Image
                  src="/images/bus.png"
                  alt="Bus"
                  width={200}
                  height={150}
                  className="rounded-md mb-4 object-cover h-32 w-full"
                />
                <h3 className="text-xl font-semibold mb-2">Bus</h3>
                <p className="text-gray-200">Ideal for large groups, tours, and events.</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/15 backdrop-blur-sm rounded-lg shadow-xl border border-yellow-500/50 hover:scale-105 transition-transform duration-300 animate-slide-in-up animate-delay-500">
                <Image
                  src="/images/car.png"
                  alt="Car"
                  width={200}
                  height={150}
                  className="rounded-md mb-4 object-cover h-32 w-full"
                />
                <h3 className="text-xl font-semibold mb-2">Car</h3>
                <p className="text-gray-200">Comfortable and reliable cars for personal or business use.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section
          id="about"
          className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden"
          style={{
            backgroundImage: `url('/images/about-bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="container px-4 md:px-6 relative z-10 text-white animate-fade-in animate-delay-100">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-12">
              About Saravana Travels
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-lg animate-slide-in-left animate-delay-200">
                <p>
                  Saravana Travels is your trusted partner for reliable 24-hour vehicle rental services in Trincomalee,
                  Sri Lanka. Our mission is1 to provide safe, comfortable, and convenient transportation solutions for
                  all your needs.
                </p>
                <p>
                  We pride ourselves on our 24/7 availability and a wide range of well-maintained vehicles, including
                  three-wheelers, vans, buses, and cars, ensuring you always find the perfect ride for any occasion, day
                  or night.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="flex flex-col items-center text-center">
                    <Clock className="h-10 w-10 text-yellow-500 mb-2" />
                    <span className="font-semibold">24/7 Service</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Users className="h-10 w-10 text-yellow-500 mb-2" />
                    <span className="font-semibold">Experienced Drivers</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <ShieldCheck className="h-10 w-10 text-yellow-500 mb-2" />
                    <span className="font-semibold">Safe & Reliable</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block animate-slide-in-right animate-delay-300">
                <Image
                  src="/images/about-us-driver.png"
                  alt="Happy professional driver"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl object-cover w-full h-full border border-yellow-500/50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 relative overflow-hidden"
          style={{
            backgroundImage: `url('/images/contact-bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gray-900/70 z-0" />
          <div className="container px-4 md:px-6 text-center relative z-10 text-white animate-fade-in animate-delay-100">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-12">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-white/15 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-yellow-500/50 animate-slide-in-up animate-delay-200">
              <div className="space-y-6 text-left p-6 rounded-lg bg-white/5 border border-yellow-500/30">
                <div className="flex items-center gap-4">
                  <MapPin className="h-8 w-8 text-yellow-500" />
                  <p className="text-lg text-gray-200">247/19, Amman Kovil Road, Linganagar, Trincomalee</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-8 w-8 text-yellow-500" />
                  <div className="text-lg text-gray-200">
                    <a href="tel:+94750660450" className="block hover:underline">
                      ‪+94 75 066 0450‬
                    </a>
                    <a href="tel:+94753154528" className="block hover:underline">
                      ‪+94 75 315 4528‬
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-8 w-8 text-yellow-500" />
                  <a href="mailto:saravanatravelsservises@gmail.com" className="text-lg text-gray-200 hover:underline">
                    saravanatravelsservises@gmail.com
                  </a>
                </div>
              </div>
              <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-2xl border border-yellow-500/50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.999999999999!2d81.22999999999999!3d8.589999999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afb44123456789d%3A0x123456789abcdef0!2sTrincomalee%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1678901234567!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Google Maps location of Saravana Travels"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 bg-black text-white text-center">
        <p className="text-lg font-semibold">Your Reliable Car Rental Partner</p>
      </footer>

      {/* Auth Dialog */}
      <AuthDialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen} />
    </div>
  )
}
