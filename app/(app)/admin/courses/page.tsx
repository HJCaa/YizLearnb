"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  FolderUp,
  UploadCloud,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ChevronDown,
  FileText,
  Check,
  X,
} from "lucide-react"
import { PageTitle } from "@/components/layout/page-title"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/ui/progress-bar"
import { cn } from "@/lib/utils"

type Status = "ready" | "importing" | "error"

type KnowledgePoint = {
  name: string
  chapter: string
  bloom: string
  positive: boolean
  negative: boolean
}

type Course = {
  id: number
  name: string
  points: number
  status: Status
  date: string
  error?: string
  kps?: KnowledgePoint[]
}

const initialCourses: Course[] = [
  {
    id: 1,
    name: "Java 面向对象",
    points: 24,
    status: "ready",
    date: "06-01",
    kps: [
      { name: "类与对象", chapter: "第 1 章", bloom: "应用", positive: true, negative: true },
      { name: "继承机制", chapter: "第 2 章", bloom: "理解", positive: true, negative: false },
      { name: "方法重写", chapter: "第 3 章", bloom: "分析", positive: true, negative: true },
      { name: "多态应用", chapter: "第 3 章", bloom: "应用", positive: false, negative: true },
      { name: "接口与抽象类", chapter: "第 4 章", bloom: "评价", positive: true, negative: false },
    ],
  },
  { id: 2, name: "Python 数据分析", points: 18, status: "importing", date: "06-01" },
  { id: 3, name: "数据结构", points: 0, status: "error", date: "05-30", error: "文件解析失败：PDF 中包含无法识别的扫描图片，请上传文本版课件。" },
]

const statusMeta: Record<Status, { label: string; variant: "success" | "warning" | "danger" }> = {
  ready: { label: "已就绪", variant: "success" },
  importing: { label: "导入中", variant: "warning" },
  error: { label: "失败", variant: "danger" },
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [dragging, setDragging] = useState(false)
  const [courseName, setCourseName] = useState("")
  const [desc, setDesc] = useState("")
  const [files, setFiles] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [expanded, setExpanded] = useState<number | null>(1)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = (list: FileList | null) => {
    if (!list) return
    const names = Array.from(list).slice(0, 5).map((f) => f.name)
    setFiles(names)
    if (!courseName && names[0]) setCourseName(names[0].replace(/\.[^.]+$/, ""))
  }

  const upload = () => {
    if (!courseName.trim() || files.length === 0) return
    setUploading(true)
    setProgress(0)
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer)
          setUploading(false)
          setCourses((prev) => [
            { id: Date.now(), name: courseName.trim(), points: 0, status: "importing", date: "06-01" },
            ...prev,
          ])
          setCourseName("")
          setDesc("")
          setFiles([])
          return 100
        }
        return p + 8
      })
    }, 110)
  }

  return (
    <div>
      <PageTitle
        title="课程管理"
        subtitle="上传课程资料，AI 自动拆分知识点并标注 Bloom 认知层次"
        action={
          <button
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            <FolderUp className="size-4" /> 上传课程
          </button>
        }
      />

      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.pptx,.docx,.md,.txt"
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />

      {/* 上传区 */}
      <Card className="mb-6 p-5">
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            addFiles(e.dataTransfer.files)
          }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition",
            dragging ? "border-brand bg-brand-soft" : "border-border text-muted-foreground hover:bg-secondary/50",
          )}
        >
          <UploadCloud className={cn("size-8", dragging ? "text-brand" : "text-muted-foreground")} />
          <p className="text-sm font-medium text-foreground">拖拽文件到此处，或点击上传</p>
          <p className="text-xs text-muted-foreground">支持 PDF / PPTX / DOCX / MD / TXT · ≤ 50MB · 1-5 个</p>
        </div>

        {files.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {files.map((f) => (
              <span key={f} className="flex items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1 text-xs text-foreground">
                <FileText className="size-3.5 text-brand" /> {f}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-foreground">课程名称 *</label>
            <input
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="例如：Java 面向对象"
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-foreground">课程描述（可选）</label>
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="简要描述课程内容"
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>
        </div>

        {uploading ? (
          <div className="mt-4">
            <div className="mb-1.5 flex items-center gap-2 text-sm text-foreground">
              <Loader2 className="size-4 animate-spin text-brand" /> 正在上传并解析课程资料...
            </div>
            <ProgressBar value={progress} />
          </div>
        ) : (
          <div className="mt-4 flex justify-end">
            <button
              onClick={upload}
              disabled={!courseName.trim() || files.length === 0}
              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              上传并导入
            </button>
          </div>
        )}
      </Card>

      {/* 课程列表 */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-muted text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">课程名称</th>
                <th className="px-4 py-3 font-medium">知识点数</th>
                <th className="px-4 py-3 font-medium">状态</th>
                <th className="px-4 py-3 font-medium">导入时间</th>
                <th className="px-4 py-3 font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {courses.map((c) => {
                const meta = statusMeta[c.status]
                const open = expanded === c.id
                return (
                  <CourseRow
                    key={c.id}
                    course={c}
                    meta={meta}
                    open={open}
                    onToggle={() => setExpanded(open ? null : c.id)}
                    onRetry={() =>
                      setCourses((prev) => prev.map((x) => (x.id === c.id ? { ...x, status: "importing" } : x)))
                    }
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

function CourseRow({
  course,
  meta,
  open,
  onToggle,
  onRetry,
}: {
  course: Course
  meta: { label: string; variant: "success" | "warning" | "danger" }
  open: boolean
  onToggle: () => void
  onRetry: () => void
}) {
  const canExpand = course.status === "ready" && course.kps && course.kps.length > 0

  return (
    <>
      <tr className={cn("transition-colors", canExpand && "cursor-pointer hover:bg-secondary/50")} onClick={canExpand ? onToggle : undefined}>
        <td className="px-4 py-3 text-muted-foreground">{String(course.id).slice(-4)}</td>
        <td className="px-4 py-3 font-medium text-foreground">{course.name}</td>
        <td className="px-4 py-3 text-muted-foreground">{course.points}</td>
        <td className="px-4 py-3">
          <span className="inline-flex items-center gap-1.5">
            {course.status === "ready" ? (
              <CheckCircle2 className="size-4 text-success" />
            ) : course.status === "importing" ? (
              <Loader2 className="size-4 animate-spin text-warning" />
            ) : (
              <span title={course.error} className="inline-flex">
                <AlertCircle className="size-4 text-danger" />
              </span>
            )}
            <Badge variant={meta.variant}>{meta.label}</Badge>
          </span>
        </td>
        <td className="px-4 py-3 text-muted-foreground">{course.date}</td>
        <td className="px-4 py-3">
          {course.status === "ready" ? (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
              查看 <ChevronDown className={cn("size-3.5 transition", open && "rotate-180")} />
            </span>
          ) : course.status === "error" ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRetry()
              }}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
            >
              <RefreshCw className="size-3.5" /> 重新导入
            </button>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          )}
        </td>
      </tr>
      {course.status === "error" ? (
        <tr>
          <td colSpan={6} className="px-4 pb-3">
            <p className="rounded-lg bg-danger-soft px-3 py-2 text-xs text-danger">{course.error}</p>
          </td>
        </tr>
      ) : null}
      <AnimatePresence>
        {open && canExpand ? (
          <tr>
            <td colSpan={6} className="p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-secondary/30"
              >
                <div className="p-4">
                  <p className="mb-2 text-sm font-medium text-foreground">知识点拆分（{course.kps!.length}）</p>
                  <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-muted text-muted-foreground">
                        <tr>
                          <th className="px-3 py-2 font-medium">知识点名称</th>
                          <th className="px-3 py-2 font-medium">章节</th>
                          <th className="px-3 py-2 font-medium">Bloom 层次</th>
                          <th className="px-3 py-2 font-medium">正例</th>
                          <th className="px-3 py-2 font-medium">反例</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {course.kps!.map((kp) => (
                          <tr key={kp.name}>
                            <td className="px-3 py-2 text-foreground">{kp.name}</td>
                            <td className="px-3 py-2 text-muted-foreground">{kp.chapter}</td>
                            <td className="px-3 py-2">
                              <Badge variant="brand">{kp.bloom}</Badge>
                            </td>
                            <td className="px-3 py-2">
                              {kp.positive ? <Check className="size-4 text-success" /> : <X className="size-4 text-muted-foreground" />}
                            </td>
                            <td className="px-3 py-2">
                              {kp.negative ? <Check className="size-4 text-success" /> : <X className="size-4 text-muted-foreground" />}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        ) : null}
      </AnimatePresence>
    </>
  )
}
