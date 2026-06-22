export const company = {
  name: "JOSPO Cooling Solutions Pvt. Ltd.",
  shortName: "JOSPO",
  tagline: "India's Trusted Air Cooler Manufacturer",
  owner: "Mahesh Gupta",
  head: "Vijay Gupta",
  address: {
    line1: "F-37E, RIICO Industrial Area",
    line2: "Near Banjara Chowk",
    line3: "Khuskhera, Bhiwadi",
    state: "Rajasthan",
    pin: "301707",
    full: "F-37E, RIICO Industrial Area, Near Banjara Chowk, Khuskhera, Bhiwadi, Rajasthan – 301707",
  },
  phones: {
    primary: "9602243363",
    secondary: "9755314500",
  },
  email: "jospoindia@gmail.com",
  instagram: "https://www.instagram.com/jospo.pvt",
  whatsapp: {
    number: "919602243363",
    message: "Hello JOSPO Team, I would like to know more about your coolers.",
    getLink: (message?: string) => {
      const msg = encodeURIComponent(
        message || "Hello JOSPO Team, I would like to know more about your coolers."
      );
      return `https://wa.me/919602243363?text=${msg}`;
    },
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3523.123!2d76.89!3d28.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRIICO+Industrial+Area+Khuskhera!5e0!3m2!1sen!2sin!4v1700000000000",
  about:
    "JOSPO Cooling Solutions Pvt. Ltd. is a leading manufacturer of high-quality air coolers designed for residential, commercial, and industrial cooling applications. We focus on performance, durability, energy efficiency, and customer satisfaction.",
  highlights: [
    {
      title: "Manufacturing Excellence",
      description: "State-of-the-art production facility with advanced machinery and skilled workforce",
      icon: "factory",
    },
    {
      title: "Premium Quality Components",
      description: "Only the finest materials — copper motors, honeycomb pads, and reinforced bodies",
      icon: "shield",
    },
    {
      title: "Energy Efficient Cooling",
      description: "Engineered for maximum airflow with minimum power consumption",
      icon: "leaf",
    },
    {
      title: "Nationwide Distribution",
      description: "Serving dealers and distributors across all Indian states",
      icon: "truck",
    },
    {
      title: "Reliable After Sales Support",
      description: "Dedicated service network ensuring hassle-free ownership experience",
      icon: "headset",
    },
  ],
} as const;
