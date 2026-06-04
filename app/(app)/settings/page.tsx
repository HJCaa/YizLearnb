"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { User, Cpu, BookOpen, Lock, Info, Check, Eye, EyeOff, Pencil, ChevronDown, Save } from "lucide-react"
import { PageTitle } from "@/components/layout/page-title"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRole } from "@/components/role-provider"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const { role } = useRole()
  const [toast, setToast] = useState<string | null>(null)

  const fireToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2200)
  }

  return (
    <div>
      <PageTitle title="设置" subtitle="管理你的个人信息、模型与学习偏好" />

      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed left-1/2 top-6 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-success-soft px-4 py-2 text-sm font-medium text-success shadow-md"
          >
            <Check className="size-4" /> {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mx-auto flex max-w-[720px] flex-col gap-5">
        <ProfileSection role={role} onToast={fireToast} />
        <ModelSection onToast={fireToast} />
        <PreferenceSection onToast={fireToast} />
        <SecuritySection onToast={fireToast} />
        <AboutSection />
      </div>
    </div>
  )
}

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
}) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="size-5 text-brand" />
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </Card>
  )
}

function ProfileSection({ role, onToast }: { role: string; onToast: (m: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState("张三")
  const [draft, setDraft] = useState(name)

  const save = () => {
    setName(draft.trim() || name)
    setEditing(false)
    onToast("显示名称已更新")
  }

  return (
    <SectionCard icon={User} title="个人信息">
      <div className="space-y-4">
        <Row label="显示名称">
          {editing ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && save()}
                className="h-9 w-40 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/40"
              />
              <button onClick={save} className="rounded-lg bg-brand px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
                保存
              </button>
            </div>
          ) : (
            <button onClick={() => { setDraft(name); setEditing(true) }} className="flex items-center gap-1.5 text-sm text-foreground hover:text-brand">
              {name} <Pencil className="size-3.5 text-muted-foreground" />
            </button>
          )}
        </Row>
        <Row label="当前角色">
          <div className="flex items-center gap-2">
            <Badge variant={role === "teacher" ? "brand" : "muted"}>{role === "teacher" ? "教师" : "学生"}</Badge>
            <span className="text-xs text-muted-foreground">角色由系统分配</span>
          </div>
        </Row>
        <Row label="注册时间">
          <span className="text-sm text-muted-foreground">2026-06-01</span>
        </Row>
      </div>
    </SectionCard>
  )
}

function ModelSection({ onToast }: { onToast: (m: string) => void }) {
  const [model, setModel] = useState("讯飞星火 Spark 4.0")
  const [temp, setTemp] = useState(0.3)

  return (
    <SectionCard icon={Cpu} title="模型设置">
      <div className="space-y-4">
        <Row label="主力模型">
          <Select value={model} onChange={setModel} options={["讯飞星火 Spark 4.0", "DeepSeek V3"]} />
        </Row>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-foreground">Temperature</span>
            <Badge variant="brand">{temp.toFixed(1)}</Badge>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-[var(--brand)]"
          />
          <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
            <span>精确 0.0</span>
            <span>发散 1.0</span>
          </div>
        </div>
        <div className="flex justify-end">
          <OutlineButton onClick={() => onToast("模型设置已保存")}>保存模型设置</OutlineButton>
        </div>
      </div>
    </SectionCard>
  )
}

function PreferenceSection({ onToast }: { onToast: (m: string) => void }) {
  const [sessions, setSessions] = useState("5")
  const [quiz, setQuiz] = useState("10")
  const [difficulty, setDifficulty] = useState("进阶")

  return (
    <SectionCard icon={BookOpen} title="学习偏好">
      <div className="space-y-4">
        <Row label="Session 数量">
          <Select value={sessions} onChange={setSessions} options={Array.from({ length: 10 }, (_, i) => String(i + 1))} />
        </Row>
        <Row label="习题数量">
          <Select value={quiz} onChange={setQuiz} options={Array.from({ length: 20 }, (_, i) => String(i + 1))} />
        </Row>
        <Row label="目标难度">
          <div className="flex gap-2">
            {["入门", "进阶", "高级"].map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm font-medium transition",
                  difficulty === d ? "border-brand bg-brand-soft text-brand" : "border-border text-foreground hover:bg-secondary",
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </Row>
        <div className="flex justify-end">
          <OutlineButton onClick={() => onToast("学习偏好已保存")}>保存学习偏好</OutlineButton>
        </div>
      </div>
    </SectionCard>
  )
}

function SecuritySection({ onToast }: { onToast: (m: string) => void }) {
  const [oldPwd, setOldPwd] = useState("")
  const [newPwd, setNewPwd] = useState("")
  const [confirm, setConfirm] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const submit = () => {
    const e: Record<string, string> = {}
    if (!oldPwd) e.old = "请输入旧密码"
    if (newPwd.length < 6) e.new = "新密码至少 6 个字符"
    else if (newPwd === oldPwd) e.new = "新密码不能与旧密码相同"
    if (confirm !== newPwd) e.confirm = "两次密码不一致"
    setErrors(e)
    if (Object.keys(e).length === 0) {
      onToast("密码已修改")
      setOldPwd("")
      setNewPwd("")
      setConfirm("")
    }
  }

  return (
    <SectionCard icon={Lock} title="账号安全">
      <div className="space-y-4">
        <PasswordField label="旧密码" value={oldPwd} onChange={setOldPwd} error={errors.old} placeholder="请输入旧密码" />
        <PasswordField label="新密码" value={newPwd} onChange={setNewPwd} error={errors.new} placeholder="请输入新密码（至少 6 位）" />
        <PasswordField label="确认新密码" value={confirm} onChange={setConfirm} error={errors.confirm} placeholder="请再次输入新密码" />
        <div className="flex justify-end">
          <button onClick={submit} className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
            修改密码
          </button>
        </div>
      </div>
    </SectionCard>
  )
}

function AboutSection() {
  return (
    <SectionCard icon={Info} title="关于">
      <div className="space-y-3 text-sm">
        <Row label="版本">
          <span className="flex items-center gap-2 text-foreground">
            v1.0.0 <Badge variant="success">最新</Badge>
          </span>
        </Row>
        <Row label="开源协议">
          <span className="text-muted-foreground">MIT License</span>
        </Row>
        <div>
          <p className="mb-1.5 text-sm text-foreground">理论基础</p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>· GenMentor：面向目标的个性化学习智能体（WWW 2025）</li>
            <li>· ExeGen：可执行学习资源生成框架（NeurIPS 2025）</li>
          </ul>
        </div>
        <div>
          <p className="mb-1.5 text-sm text-foreground">技术栈</p>
          <div className="flex flex-wrap gap-1.5">
            {["Next.js 16", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Recharts", "lucide-react"].map((t) => (
              <Badge key={t} variant="muted">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

/* ---------- 小组件 ---------- */

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="text-sm text-foreground">{label}</span>
      {children}
    </div>
  )
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-40 appearance-none rounded-lg border border-border bg-background pl-3 pr-9 text-sm text-foreground outline-none focus:ring-2 focus:ring-brand/40"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}

function OutlineButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-lg border border-brand px-4 py-2 text-sm font-medium text-brand transition hover:bg-brand-soft"
    >
      <Save className="size-4" /> {children}
    </button>
  )
}

function PasswordField({
  label,
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder: string
}) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <label className="mb-1.5 block text-sm text-foreground">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-10 w-full rounded-lg border bg-background pl-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-brand/40",
            error ? "border-danger" : "border-border",
          )}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          aria-label={show ? "隐藏密码" : "显示密码"}
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error ? <p className="mt-1 text-xs text-danger">{error}</p> : null}
    </div>
  )
}
