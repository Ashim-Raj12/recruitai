import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Heading } from '../ui/Typography';
import { FadeUp } from '../animations';

const faqs = [
  {
    question: "Is RecruitAI really free to start?",
    answer: "Yes! Our free tier gives you access to basic resume parsing, one text-based mock interview, and standard AI feedback so you can experience the value before upgrading."
  },
  {
    question: "How accurate is the ATS scoring?",
    answer: "Our ATS parser is built on the same logic used by Workday, Greenhouse, and Lever. We analyze your resume against standard industry parsing rules to ensure your formatting and keywords are readable by machines."
  },
  {
    question: "Can I use RecruitAI for technical interviews?",
    answer: "Absolutely. Our platform includes an interactive coding IDE. The AI copilot will ask you algorithmic questions, evaluate your time/space complexity, and review your code cleanliness just like a human interviewer."
  },
  {
    question: "Do you offer refunds if I'm not satisfied?",
    answer: "We offer a 7-day money-back guarantee on all Pro plans. If you don't find the platform helpful in your job search, just email our support team for a full refund."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-border/50">
      <button
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        onClick={onClick}
      >
        <span className="font-semibold text-lg">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="text-muted-foreground ml-4 shrink-0"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground leading-relaxed pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <FadeUp>
              <Heading className="mb-4">Frequently Asked Questions</Heading>
              <p className="text-muted-foreground text-lg mb-8 max-w-md">
                Have a question that is not answered? You can contact us at support@recruitai.app.
              </p>
            </FadeUp>
          </div>
          
          <div className="lg:col-span-7">
            <FadeUp delay={0.2} className="flex flex-col">
              {faqs.map((faq, index) => (
                <FAQItem 
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              ))}
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
