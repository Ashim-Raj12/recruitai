import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card, CardContent } from '../ui/Cards';
import { Avatar } from '../ui/Profile';
import { Heading, Body } from '../ui/Typography';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Frontend Engineer",
    company: "TechCorp",
    content: "RecruitAI completely transformed my resume. The ATS scanner identified gaps I never would have noticed. Landed 3 interviews in my first week!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "Innovate Inc",
    content: "The mock interview feature is incredibly realistic. The AI feedback on my STAR method answers helped me secure an offer at a FAANG company.",
    rating: 5
  },
  {
    name: "Aisha Patel",
    role: "Recent Grad",
    company: "Startup Co",
    content: "As a new grad, I had no idea how to structure my experience. The AI career coach guided me step-by-step. Worth every penny.",
    rating: 5
  },
  {
    name: "David Kim",
    role: "Backend Developer",
    company: "CloudSystems",
    content: "The coding interview practice environment is top-tier. It doesn't just check if your code runs; it gives hints like a real interviewer would.",
    rating: 5
  },
  {
    name: "Jessica Lopez",
    role: "UX Designer",
    company: "DesignHub",
    content: "I love the clean interface and how actionable the feedback is. It took the anxiety out of the entire job hunting process.",
    rating: 5
  }
];

const TestimonialCard = ({ testimonial }) => (
  <Card className="w-[350px] shrink-0 bg-background/50 backdrop-blur-sm border-border/50">
    <CardContent className="p-6">
      <div className="flex gap-1 mb-4 text-warning">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>
      <p className="text-foreground/80 mb-6 line-clamp-4 leading-relaxed">
        "{testimonial.content}"
      </p>
      <div className="flex items-center gap-3">
        <Avatar src={`https://api.dicebear.com/7.x/notionists/svg?seed=${testimonial.name}&backgroundColor=transparent`} alt={testimonial.name} />
        <div>
          <h4 className="text-sm font-semibold text-foreground">{testimonial.name}</h4>
          <p className="text-xs text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Testimonials = () => {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10" />
      
      <div className="container mx-auto px-4 mb-16 text-center">
        <Heading className="mb-4">Loved by job seekers worldwide.</Heading>
        <Body className="text-muted-foreground max-w-2xl mx-auto">
          Don't just take our word for it. See how RecruitAI has helped professionals land their dream roles.
        </Body>
      </div>

      <div className="relative w-full flex overflow-x-hidden group pb-8">
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: [0, -2000] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          }}
        >
          {/* Double the array for seamless infinite scroll */}
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
