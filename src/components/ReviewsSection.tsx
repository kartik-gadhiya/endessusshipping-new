import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Loader2 } from "lucide-react";
import { useGoogleReviews, type GoogleReview } from "../hooks/useGoogleReviews";

const ReviewCard = ({ review, index }: { review: GoogleReview; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
    viewport={{ once: true }}
    className="glass-card bg-white dark:bg-card p-6 flex flex-col w-[320px] md:w-[360px] mx-3 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1 transition-all duration-300 border-t-2 border-t-accent/50"
  >
    <div className="flex items-center gap-4 mb-5">
      <img
        src={review.avatar}
        alt={review.name}
        className="w-12 h-12 rounded-full object-cover border-2 border-accent/20"
      />
      <div>
        <h4 className="font-bold text-foreground text-sm tracking-wide">{review.name}</h4>
        <p className="text-xs text-muted-foreground">{review.date}</p>
      </div>
    </div>
    <div className="flex gap-1 mb-4">
      {Array.from({ length: review.rating }).map((_, i) => (
        <Star key={i} size={16} className="fill-gold text-gold" />
      ))}
    </div>
    {review.text ? (
      <p className="text-sm text-muted-foreground/90 leading-relaxed font-medium flex-1">"{review.text}"</p>
    ) : (
      <p className="text-sm text-muted-foreground/90 leading-relaxed font-medium flex-1 italic">This user only left a rating.</p>
    )}
    <div className="mt-5 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground/70 font-semibold uppercase tracking-wider">
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      <span>Verified on Google</span>
    </div>
  </motion.div>
);

const ReviewsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { reviews, isLoading } = useGoogleReviews();

  return (
    <section
      id="reviews"
      className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,#eef5ff_0%,#f9fcff_55%,#edf4ff_100%)]"
      ref={ref}
    >
      <motion.div 
        animate={{ opacity: [0.03, 0.05, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-background to-background"
      />

      <div className="max-w-7xl mx-auto relative z-10 home-section-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mt-3 mb-4 text-foreground tracking-tight">
            What Our Clients Say
          </h2>
          <div className="w-20 h-1.5 gradient-red rounded-full mx-auto mb-6 shadow-lg shadow-red/20" />
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-medium">
            Join hundreds of satisfied businesses relying on our world-class freight solutions.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Company Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-sm lg:w-1/3 xl:w-1/4 flex-shrink-0"
          >
            <div className="glass-card bg-white dark:bg-card p-8 flex flex-col items-center text-center shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <img 
                decoding="async" 
                src="https://lh5.googleusercontent.com/p/AF1QipPYIpuUY0WbqtjsA5uilfhyO0hbbnnz9jYYp4ZN=w130-h130-p-k-no" 
                alt="EN DESSUS GLOBAL FORWARDING PVT. LTD." 
                loading="lazy"
                className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-accent/20"
              />
              <h3 className="font-extrabold text-foreground text-base tracking-wide mb-3">
                EN DESSUS GLOBAL FORWARDING PVT. LTD.
              </h3>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={22} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm font-semibold text-foreground mb-6 opacity-90">{reviews.length}+ Google reviews</p>
              <a 
                href="https://admin.trustindex.io/api/googleWriteReview?place-id=ChIJgbeWEtWEXjkRtPykcs9e-Sg" 
                role="button" 
                aria-label="Write a review to Google" 
                target="_blank" 
                rel="noopener"
                className="bg-[#4285F4] hover:bg-[#3367d6] text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm w-full shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                Write a review
              </a>
            </div>
          </motion.div>

          {/* Marquee Wrapper */}
          <div className="w-full lg:w-2/3 xl:w-3/4 flex overflow-hidden relative group [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] min-h-[250px]">
            {isLoading ? (
              <div className="w-full flex items-center justify-center">
                <Loader2 size={40} className="animate-spin text-accent" />
              </div>
            ) : (
              <>
                <div 
                  className="flex shrink-0 min-w-full justify-around animate-marquee group-hover:[animation-play-state:paused]"
                  style={{ "--duration": "50s", "--gap": "0px" } as any}
                >
                  {reviews.map((review, i) => (
                    <ReviewCard key={`1-${i}`} review={review} index={i} />
                  ))}
                </div>
                <div 
                  className="flex shrink-0 min-w-full justify-around animate-marquee group-hover:[animation-play-state:paused]"
                  style={{ "--duration": "50s", "--gap": "0px" } as any}
                >
                  {reviews.map((review, i) => (
                    <ReviewCard key={`2-${i}`} review={review} index={i} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
