"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Creator",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "10 AI generations per day",
      "Standard export quality",
      "Public community templates",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$24",
    description: "For serious builders",
    features: [
      "Unlimited generations",
      "High-fidelity vector exports",
      "Private workspaces & teams",
      "Priority GPU access",
    ],
    popular: true,
  },
]

export function PricingSection() {
  return (
    <section className="relative py-32 bg-astral-deep border-t border-white/5 overflow-hidden">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-thin tracking-tight text-white mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light">
            Choose a plan that scales with your creativity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">

          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}

        </div>

      </div>
    </section>
  )
}

function PricingCard({
  name,
  price,
  description,
  features,
  popular,
}: {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
}) {
  return (
    <div
      className={`
        relative rounded-3xl p-10 text-left
        border backdrop-blur-xl transition-all
        ${popular
          ? "border-primary/40 bg-white/[0.05] shadow-[0_0_80px_rgba(179,193,255,0.08)]"
          : "border-white/10 bg-white/[0.03]"
        }
      `}
    >
      {popular && (
        <div className="absolute -top-3 right-6 px-4 py-1 bg-primary text-astral-deep text-[10px] font-bold uppercase tracking-widest rounded-full">
          Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className={`text-xs font-bold uppercase tracking-[0.3em] mb-3 ${popular ? "text-primary" : "text-slate-500"}`}>
          {name}
        </h3>

        <div className="flex items-end gap-2 mb-2">
          <span className="text-5xl font-black text-white">{price}</span>
          <span className="text-sm text-slate-500 mb-2">/month</span>
        </div>

        <p className="text-slate-400 text-sm font-light">
          {description}
        </p>
      </div>

      <ul className="space-y-4 mb-10">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
            <Check className="h-4 w-4 text-primary mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        className={`
          w-full rounded-xl text-sm font-semibold
          ${popular
            ? "bg-primary text-astral-deep hover:bg-primary/90"
            : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
          }
        `}
      >
        {popular ? "Go Unlimited" : "Start Building"}
      </Button>
    </div>
  )
}
