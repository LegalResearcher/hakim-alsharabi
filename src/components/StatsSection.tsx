import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const stats = [
  { number: 15, suffix: "+", label: "سنة خبرة" },
  { number: 1500, suffix: "+", label: "استشارة قانونية ناجحة" },
  { number: 16, suffix: "+", label: "شركة تم تأسيسها" },
  { number: 100, suffix: "%", label: "رضا العملاء" }
];

const CounterAnimation = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-gold">
      {count.toLocaleString('ar-EG')}{suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container-legal">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <CounterAnimation target={stat.number} suffix={stat.suffix} />
              <p className="mt-2 text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
