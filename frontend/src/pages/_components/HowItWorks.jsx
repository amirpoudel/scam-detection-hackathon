import { Upload, Search, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../_fetchWrapper/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Submit Content",
      description:
        "Paste a WhatsApp message, upload a voice note, or enter a website URL.",
      icon: Upload,
      color: "bg-blue-500/20",
      textColor: "text-blue-400",
    },
    {
      id: 2,
      title: "AI Analysis",
      description:
        "Our system checks for scam patterns in multiple languages using advanced algorithms.",
      icon: Search,
      color: "bg-purple-500/20",
      textColor: "text-purple-400",
    },
    {
      id: 3,
      title: "Get Results",
      description:
        "Receive immediate feedback with risk level assessment and detailed explanation.",
      icon: CheckCircle,
      color: "bg-emerald-500/20",
      textColor: "text-emerald-400",
    },
  ];

  return (
    <section id="how-it-works" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold !text-slate-100 mb-4">
          How It Works
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Our multilingual scam detection system uses advanced AI to protect you
          from digital threats
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm h-full">
              <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                <div className={`p-3 rounded-full ${step.color} mb-4`}>
                  <step.icon className={`h-6 w-6 ${step.textColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.id}. {step.title}
                </h3>
                <p className="text-slate-400">{step.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 inline-block max-w-2xl">
          <p className="text-slate-300 text-sm">
            <span className="font-semibold text-white">
              Our AI models are trained on diverse datasets
            </span>{" "}
            in multiple languages to recognize the latest scam tactics, social
            engineering tricks, and malicious patterns.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
