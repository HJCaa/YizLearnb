"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { User, Lock, Eye, EyeOff, GraduationCap, ChevronDown, Loader2, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Tab = "login" | "register"

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("login")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shake, setShake] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  // login fields
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPwd, setShowPwd] = useState(false)

  // register fields
  const [rUsername, setRUsername] = useState("")
  const [rPassword, setRPassword] = useState("")
  const [rConfirm, setRConfirm] = useState("")
  const [rShowPwd, setRShowPwd] = useState(false)
  const [rShowConfirm, setRShowConfirm] = useState(false)
  const [role, setRole] = useState<"" | "student" | "teacher">("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const triggerError = (msg: string) => {
    setError(msg)
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  const handleLogin = () => {
    setError(null)
    if (!username || !password) return triggerError("请输入用户名和密码")
    if (password.length < 6) return triggerError("密码长度不足")
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push("/dashboard")
    }, 1200)
  }

  const validateRegister = () => {
    const e: Record<string, string> = {}
    if (rUsername.length < 3) e.username = "用户名至少 3 个字符"
    if (rPassword.length < 6) e.password = "密码至少 6 个字符"
    if (rConfirm !== rPassword) e.confirm = "两次密码不一致"
    if (!role) e.role = "请选择角色"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleRegister = () => {
    setError(null)
    if (!validateRegister()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setToast("注册成功！请登录")
      setTab("login")
      setTimeout(() => setToast(null), 2500)
    }, 1200)
  }

  const inputBase =
    "h-11 w-full rounded-lg border bg-background pl-10 pr-10 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-brand/40"

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-success-soft px-4 py-2 text-sm font-medium text-success shadow-md"
          >
            <CheckCircle2 className="size-4" />
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div animate={shake ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-[440px]">
        <Card className="p-10">
          <div className="mb-6 flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg gradient-brand text-sm font-bold text-white">弈</span>
              <span className="text-xl font-bold text-foreground">弈知 · YizLearn</span>
            </div>
            <p className="text-[13px] text-muted-foreground">AI 驱动的个性化学习</p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex border-b border-border">
            {(["login", "register"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t)
                  setError(null)
                }}
                className={cn(
                  "relative flex-1 pb-2.5 text-sm font-medium transition-colors",
                  tab === t ? "text-brand" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t === "login" ? "登录" : "注册"}
                {tab === t ? (
                  <motion.span layoutId="tab-underline" className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand" />
                ) : null}
              </button>
            ))}
          </div>

          {error ? (
            <div className="mb-4 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">{error}</div>
          ) : null}

          {tab === "login" ? (
            <div className="flex flex-col gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  placeholder="请输入用户名"
                  className={cn(inputBase, "border-border")}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  placeholder="请输入密码"
                  className={cn(inputBase, "border-border")}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <button
                onClick={handleLogin}
                disabled={loading}
                className="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                {loading ? "登录中..." : "登 录"}
              </button>
              <p className="text-center text-[13px] text-muted-foreground">
                没有账号？
                <button onClick={() => setTab("register")} className="font-medium text-brand hover:underline">
                  立即注册 →
                </button>
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Field icon={<User className="size-4" />} error={errors.username}>
                <input
                  value={rUsername}
                  onChange={(e) => setRUsername(e.target.value)}
                  onBlur={validateRegister}
                  disabled={loading}
                  placeholder="请输入用户名（至少3个字符）"
                  className={cn(inputBase, errors.username ? "border-danger" : "border-border")}
                />
              </Field>
              <Field icon={<Lock className="size-4" />} error={errors.password}>
                <input
                  type={rShowPwd ? "text" : "password"}
                  value={rPassword}
                  onChange={(e) => setRPassword(e.target.value)}
                  onBlur={validateRegister}
                  disabled={loading}
                  placeholder="请输入密码（至少6个字符）"
                  className={cn(inputBase, errors.password ? "border-danger" : "border-border")}
                />
                <button type="button" onClick={() => setRShowPwd((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {rShowPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </Field>
              <Field icon={<Lock className="size-4" />} error={errors.confirm}>
                <input
                  type={rShowConfirm ? "text" : "password"}
                  value={rConfirm}
                  onChange={(e) => setRConfirm(e.target.value)}
                  onBlur={validateRegister}
                  disabled={loading}
                  placeholder="请再次输入密码"
                  className={cn(inputBase, errors.confirm ? "border-danger" : "border-border")}
                />
                <button type="button" onClick={() => setRShowConfirm((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {rShowConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </Field>
              <Field icon={<GraduationCap className="size-4" />} error={errors.role}>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as typeof role)}
                  disabled={loading}
                  className={cn(
                    inputBase,
                    "appearance-none pr-10",
                    role ? "text-foreground" : "text-muted-foreground",
                    errors.role ? "border-danger" : "border-border",
                  )}
                >
                  <option value="">请选择角色</option>
                  <option value="student">学生</option>
                  <option value="teacher">教师</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </Field>
              <button
                onClick={handleRegister}
                disabled={loading}
                className="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                {loading ? "注册中..." : "注 册"}
              </button>
            </div>
          )}
        </Card>
      </motion.div>
    </main>
  )
}

function Field({ icon, error, children }: { icon: React.ReactNode; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        {children}
      </div>
      {error ? <p className="mt-1 text-xs text-danger">{error}</p> : null}
    </div>
  )
}
