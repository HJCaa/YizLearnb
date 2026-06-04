import { Sidebar, MobileTabBar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { AiTutor } from "@/components/ai-tutor"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 p-5 pb-20 md:p-8 md:pb-8">{children}</main>
      </div>
      <MobileTabBar />
      <AiTutor />
    </div>
  )
}
