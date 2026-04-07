import { useState, useEffect } from "react";

export type GoogleReview = {
  name: string;
  avatar: string;
  text: string;
  rating: number;
  date: string;
};

// Fallback reviews to use if the API connection fails
export const fallbackReviews: GoogleReview[] = [
  {
    name: "Anil Patel",
    date: "2022-11-22",
    rating: 5,
    text: "Fast and safe service",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWO0ba90-XFem_mQ6wVjIwLo-bpt77-xUczBGqaIomxX0q6IrNi4A=w40-h40-c-rp-mo-br100",
  },
  {
    name: "Jenish Bodar",
    date: "2024-03-06",
    rating: 5,
    text: "Excellent logistics service with timely deliveries.",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocI7kFV1RP-As4qarnSOvDZLDGTTPebhv724N2zFMkssSpd8bg=w40-h40-c-rp-mo-br100",
  },
  {
    name: "Tarun Jagani",
    date: "2023-11-20",
    rating: 5,
    text: "Very professional and reliable shipping partner.",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjX3ewP6qv_aTQrPB0H4pROMDknYel9cO889x3bYcCYxUd5tgXMI=w40-h40-c-rp-mo-br100",
  },
  {
    name: "Darshak Patel",
    date: "2022-11-23",
    rating: 5,
    text: "Great experience with customs clearance services.",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocKgw9G_TCr7kJzN7QaNC0xEl6kcsabM0cLLeD0JV19l-CjqxA=w40-h40-c-rp-mo-br100",
  },
  {
    name: "Hemin Patel",
    date: "2022-11-23",
    rating: 5,
    text: "Trusted forwarding company with competitive rates.",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJ-xN9EwDa-TuoxeaztGXpDbKEppXgKGzemalw-8xSNZS7Zgg=w40-h40-c-rp-mo-br100",
  },
  {
    name: "Priyansh Gajera",
    date: "2022-11-22",
    rating: 5,
    text: "Smooth and hassle-free shipment handling.",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocKiIVBLSNyF7NGs8kujOzk_RTi8m-_mE8HgYf_65FQmfagSmj_Y=w40-h40-c-rp-mo-br100",
  },
  {
    name: "Akshay Kanpariya",
    date: "2022-11-22",
    rating: 5,
    text: "Highly recommend for international freight services.",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVOrHxbCRSnWaRmD1quw1fPlPhcUH116WJ1jzK7ZqPw45LQNG-pZA=w40-h40-c-rp-mo-br100",
  },
  {
    name: "Amit Ghodasara",
    date: "2022-11-22",
    rating: 5,
    text: "Dependable team with excellent communication.",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVrLQIWWKaraWjEJgWyRsJuLfBT8gN85z21m_yIa0va9jfjcmeJ=w40-h40-c-rp-mo-br100",
  },
];

export const useGoogleReviews = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        // By default, attempt to hit the proxy or the env variable endpoint.
        const endpoint = import.meta.env.VITE_WP_API_URL || "http://endessusshipping.local/api-reviews.php";
        
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const json = await response.json();
        
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          console.log("Reviews data from WP API:", json.data);
          setReviews(json.data);
        } else {
          // Fallback if data format is unexpected
          console.warn("Invalid reviews data from WP API. Using fallbacks.");
          setReviews(fallbackReviews);
        }
      } catch (err: any) {
        console.error("Failed to fetch Google Reviews from WP:", err);
        setError(err.message);
        // Fallback to static reviews if the API endpoint is completely inaccessible
        setReviews(fallbackReviews);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return { reviews, isLoading, error };
};
