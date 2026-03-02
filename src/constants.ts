export const CONTACT_DETAILS = {
  phone: '+91 8296079646',
  whatsappNumber: '918296079646', // Format: CountryCodePhoneNumber (no + or spaces)
  email: 'amir',
  address: 'Madabhavi,Athani,Karnataka',
  googleMapsLink: 'https://maps.app.goo.gl/edgYrDtQXsgGD5cq8', // Replace with actual Google Maps link
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1909.7398515787536!2d74.95472128412707!3d16.80254201343264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc12bfc64fccc25%3A0x51bf8a35b504efed!2sMulla%20Photography!5e0!3m2!1sen!2sin!4v1772028353168!5m2!1sen!2sin',
  workingHours: 'Mon - Sun: 10AM - 8PM',
  socials: {
    instagram: 'https://www.instagram.com/mulla_photography99?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  },
  heroImage: 'https://hjjbuohrssvthqhpjrhe.supabase.co/storage/v1/object/public/portfolio/0.19000086968215368.webp'
};

export interface ServiceItem {
  title: string;
  price: number;
  category: string;
  features: string[];
  isPopular?: boolean;
}

export const PHOTOGRAPHY_SERVICES: ServiceItem[] = [
  {
    title: "Wedding Story",
    price: 50000,
    category: "Photography",
    isPopular: true,
    features: [
      "Full day coverage (12 hours)",
      " Professional photographers team",
      "500+ High-res edited photos",
      "Premium photo album (40+ pages)",
      "Cinematic highlight video"
    ]
  },
  {
    title: "Portrait Session",
    price: 5000,
    category: "Photography",
    features: [
      "2+ Hour studio/outdoor session",
      "3+ Outfit changes",
      "20 Professionally retouched photos",
      "fast edit",
      "Print release included"
    ]
  },
  {
    title: "Event Coverage",
    price: 15000,
    category: "Photography",
    features: [
      "4+ Hours of coverage",
      "Candid & group shots",
      "150+ Edited digital images",
      "With Professional Team",
      "Social media optimized files"
    ]
  }
];

export const PRINTING_SERVICES: ServiceItem[] = [
  {
    title: "ID Cards",
    price: 150,
    category: "Printing",
    features: [
      "PVC durable material",
      "Lanyard included",
      "Bulk discounts available",
      "Design service included"
    ]
  },
  {
    title: "Event Badge",
    price: 250,
    category: "Printing",
    features: [
      "Customized design",
      "Clip or Pin attachment",
      "High-quality printing",
      "Perfect for conferences"
    ]
  },
  {
    title: "School Belt",
    price: 450,
    category: "Printing",
    features: [
      "Custom school logo",
      "Durable buckle",
      "Adjustable size",
      "Quality fabric material"
    ]
  }
];
