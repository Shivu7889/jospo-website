export interface Testimonial {
  id: string;
  name: string;
  location: string;
  role: string;
  rating: number;
  text: string;
  product?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rajesh Sharma",
    location: "Jaipur, Rajasthan",
    role: "Shop Owner",
    rating: 5,
    text: "We installed 4 JOSPO Defender 135L coolers in our warehouse. The cooling performance is outstanding even in peak summer of Rajasthan. The build quality is exceptional and maintenance is minimal. Highly recommended for commercial use.",
    product: "Defender 135L",
  },
  {
    id: "t2",
    name: "Priya Mehta",
    location: "Ahmedabad, Gujarat",
    role: "Homeowner",
    rating: 5,
    text: "The JOSPO Signature 100L has been a game-changer for our home. It cools our entire hall effortlessly and the water tank lasts the whole night. Very energy efficient — our electricity bill barely went up!",
    product: "Signature 100L",
  },
  {
    id: "t3",
    name: "Anil Verma",
    location: "Delhi NCR",
    role: "Factory Manager",
    rating: 5,
    text: "After trying multiple brands, JOSPO Tent Plus 200L is the only cooler that effectively cools our 2000 sq ft production floor. The 26-inch fan delivers massive air flow. We've now ordered 10 more units.",
    product: "Tent Plus 200L",
  },
  {
    id: "t4",
    name: "Suresh Patel",
    location: "Indore, MP",
    role: "Distributor",
    rating: 5,
    text: "As a distributor, I've been associated with JOSPO for 3 years. Their products have zero complaints from customers, margins are healthy, and the after-sales support team is always responsive. Best brand to work with.",
  },
  {
    id: "t5",
    name: "Mohammed Arif",
    location: "Hyderabad, Telangana",
    role: "Restaurant Owner",
    rating: 4,
    text: "We use JOSPO Storm 130L in our outdoor seating area. Even in humid conditions, the cooling is remarkably effective. Our customers always appreciate the comfortable dining experience.",
    product: "Storm 130L",
  },
  {
    id: "t6",
    name: "Kavita Joshi",
    location: "Lucknow, UP",
    role: "Office Manager",
    rating: 5,
    text: "The JOSPO Amaze 90L is perfect for our office space. It's quiet, powerful, and the design looks very professional. The large tank means we only refill once a day. Great product!",
    product: "Amaze 90L",
  },
];
