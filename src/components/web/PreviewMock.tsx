import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp } from "lucide-react"

export function PreviewMock() {
  return (
    <div className="relative w-full max-w-6xl mx-auto">

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-primary/30 blur-[140px] rounded-full scale-75 opacity-20" />

      <Card className="relative rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6)]">

        {/* Window Bar */}
        <div className="h-10 border-b border-white/5 flex items-center px-5 bg-white/[0.03]">
          <div className="flex gap-2">
            <div className="size-3 rounded-full bg-white/10" />
            <div className="size-3 rounded-full bg-white/10" />
            <div className="size-3 rounded-full bg-white/10" />
          </div>
          <div className="ml-6 w-32 h-2 bg-white/10 rounded-full" />
        </div>

        {/* Preview Content */}
        <div className="aspect-video px-10 py-12">

          <div className="grid grid-cols-3 gap-8">

            {/* Left: Main Analytics Card */}
            <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8">

              <div className="flex items-center justify-between mb-8">
                <div className="space-y-3">
                  <div className="w-40 h-3 bg-white/15 rounded-full" />
                  <div className="w-24 h-2 bg-white/10 rounded-full" />
                </div>

                <div className="flex items-center gap-2 text-primary text-sm">
                  <TrendingUp className="h-4 w-4" />
                  +24%
                </div>
              </div>

              {/* Fake Graph Bars */}
              <div className="flex items-end gap-3 h-32">
                <div className="w-6 bg-primary/30 rounded-md h-12" />
                <div className="w-6 bg-primary/40 rounded-md h-20" />
                <div className="w-6 bg-primary/60 rounded-md h-28" />
                <div className="w-6 bg-primary/40 rounded-md h-16" />
                <div className="w-6 bg-primary/30 rounded-md h-10" />
              </div>

            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">

              {/* Mini Stat Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6">

                <div className="flex items-center gap-3 mb-6">
                  <div className="size-9 rounded-xl bg-primary/20 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="w-24 h-2 bg-white/15 rounded-full" />
                </div>

                <div className="space-y-3">
                  <div className="w-full h-2 bg-white/10 rounded-full" />
                  <div className="w-2/3 h-2 bg-white/10 rounded-full" />
                </div>

              </div>

              {/* Activity Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 space-y-4">
                <div className="w-28 h-2 bg-white/15 rounded-full" />
                <div className="space-y-2">
                  <div className="w-full h-1 bg-white/10 rounded-full" />
                  <div className="w-full h-1 bg-white/10 rounded-full" />
                  <div className="w-3/4 h-1 bg-white/10 rounded-full" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </Card>
    </div>
  )
}
