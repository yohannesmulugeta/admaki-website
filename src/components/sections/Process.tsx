import React from 'react';
import Button from '@/components/ui/Button';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Understand',
    description: 'Understand the business, user, workflow and actual problem before deciding what to build.',
    deliverables: ['Problem definition', 'Workflow mapping', 'Requirement analysis', 'Feasibility review'],
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Define the structure, user experience, technology and execution plan around the real priority.',
    deliverables: ['Information architecture', 'System specification', 'Technical stack', 'Execution roadmap'],
  },
  {
    number: '03',
    title: 'Build',
    description: 'Design, develop, test and refine the solution with a strong focus on clarity and reliability.',
    deliverables: ['UI/UX design', 'Development', 'Integrations', 'Testing'],
  },
  {
    number: '04',
    title: 'Improve',
    description: 'Review real use, remove friction and keep improving the product as the business changes.',
    deliverables: ['Feedback review', 'Optimization', 'Support', 'Iteration'],
  },
];

export default function Process() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#080a0c] text-white py-24 sm:py-32 border-t border-white/10"
      aria-label="How I Work - Process"
    >
      <div className="absolute inset-0 studio-grid-dark opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/16 pt-6 sm:pt-8">
          <div className="lg:col-span-4">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.28em] uppercase text-[#69dceb]">
              04 / HOW I WORK
            </span>
          </div>

          <div className="lg:col-span-8">
            <h2 className="text-[clamp(3rem,7.2vw,6.8rem)] font-semibold tracking-[-0.065em] leading-[0.88] text-white max-w-5xl">
              From unclear problem to useful product.
            </h2>
            <p className="mt-7 max-w-2xl text-sm sm:text-base text-zinc-400 leading-relaxed">
              A practical process that keeps the project focused on what the business actually needs.
            </p>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 border-t border-white/14 border-l border-white/14">
          {processSteps.map((step) => (
            <article
              key={step.number}
              className="min-h-[25rem] p-6 sm:p-8 border-r border-b border-white/14 flex flex-col justify-between transition-colors hover:bg-white/[0.025]"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-mono text-[#69dceb]">{step.number}</span>
                  <span className="h-px flex-1 bg-white/12" />
                </div>

                <h3 className="mt-8 text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-white">
                  {step.title}
                </h3>

                <p className="mt-5 text-sm text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-10">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-600 block mb-4">
                  Key outputs
                </span>
                <ul className="space-y-2">
                  {step.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                      <span className="mt-[0.45rem] h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/16 pt-8 sm:pt-10 items-end">
          <div className="lg:col-span-8">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.22em] uppercase text-zinc-600">
              Ready when the problem is worth solving.
            </span>
            <h3 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.05em] leading-[0.94] text-white max-w-3xl">
              Let&apos;s turn the idea into something people can actually use.
            </h3>
          </div>

          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Button
              asLink
              href="#contact"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-none"
            >
              <span>Start a Conversation</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
