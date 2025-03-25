import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="mb-2 font-tenor text-xl uppercase tracking-wider">
                Join Our Newsletter
              </h3>
              <p className="font-twentieth text-sm text-white/80">
                Subscribe to get special offers, free giveaways, and beard care tips.
              </p>
            </div>
            <div>
              <form className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-black px-4 py-3 font-twentieth text-white placeholder:text-white/50 focus:outline-none"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-accent px-6 py-3 font-tenor text-sm uppercase tracking-wider text-white transition hover:bg-accent/90"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {/* Logo and About */}
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <Link href="/" className="mb-6 inline-block">
                <Image 
                  src="/images/logo.png" 
                  alt="Beard and Bones" 
                  width={150} 
                  height={40} 
                  className="h-auto w-auto"
                />
              </Link>
              <p className="mb-6 font-twentieth text-sm text-white/80">
                Premium beard care products handcrafted for the modern gentleman.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                  <a 
                    key={social}
                    href={`https://${social}.com/beardandbones`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white transition hover:text-accent"
                    aria-label={`Follow us on ${social}`}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="currentColor" 
                      viewBox="0 0 24 24" 
                      className="h-5 w-5"
                    >
                      {social === 'facebook' && (
                        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                      )}
                      {social === 'instagram' && (
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                      )}
                      {social === 'twitter' && (
                        <path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59z" />
                      )}
                      {social === 'youtube' && (
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      )}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="mb-4 font-tenor text-base uppercase tracking-wider">
                Shop
              </h4>
              <ul className="space-y-2">
                {['Beard Oil', 'Beard Balm', 'Grooming Kits', 'Accessories', 'Gift Cards'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/collections/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="font-twentieth text-sm text-white/80 transition hover:text-accent"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Information */}
            <div>
              <h4 className="mb-4 font-tenor text-base uppercase tracking-wider">
                Information
              </h4>
              <ul className="space-y-2">
                {['About Us', 'Contact', 'FAQ', 'Shipping & Returns', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/pages/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="font-twentieth text-sm text-white/80 transition hover:text-accent"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="mb-4 font-tenor text-base uppercase tracking-wider">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    className="mr-3 h-5 w-5 flex-shrink-0 text-accent"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-twentieth text-sm text-white/80">
                    123 Beard Street, London, UK
                  </span>
                </li>
                <li className="flex items-start">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    className="mr-3 h-5 w-5 flex-shrink-0 text-accent"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-twentieth text-sm text-white/80">
                    info@beardandbones.co.uk
                  </span>
                </li>
                <li className="flex items-start">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    className="mr-3 h-5 w-5 flex-shrink-0 text-accent"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-twentieth text-sm text-white/80">
                    +44 (0) 123 456 7890
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="font-twentieth text-xs text-white/60">
              © {new Date().getFullYear()} Beard and Bones. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              {['Visa', 'Mastercard', 'American Express', 'PayPal'].map((payment) => (
                <span key={payment} className="font-twentieth text-xs text-white/60">
                  {payment}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 